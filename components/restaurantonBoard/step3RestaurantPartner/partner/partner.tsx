'use client'

import { useState } from 'react'
import ReviewCard from '../reviewCard/reviewCard'
import SignatureCard from '../signatureCard/signatureCard'
import DeclarationCard from '../declarationCard/declarationCard'
import { useDispatch } from 'react-redux'
import { restaurantContract } from '@/redux/slice/restaurantSlice'
import { yupResolver } from "@hookform/resolvers/yup";
import { contractSchema } from '@/validators/restaurantValidator'
import { useForm } from 'react-hook-form'
const STEPS = [
    { num: 1, label: 'Restaurant Information', done: true },
    { num: 2, label: 'Restaurant Documents', done: true },
    { num: 3, label: 'Menu Setup', done: true },
    { num: 4, label: 'Partner Contract', done: false, active: true },
]

const CONTRACT_SECTIONS = [
    { id: 'terms', title: 'Terms of Service', required: true },
    { id: 'commission', title: 'Commission & Payment Terms', required: true },
    { id: 'ops', title: 'Operational Guidelines', required: true },
    { id: 'ip', title: 'Intellectual Property', required: false },
    { id: 'privacy', title: 'Privacy & Data Policy', required: true },
    { id: 'termination', title: 'Termination Policy', required: false },
]

export default function PartnerContract({ setCompletedSteps }) {
    const [expanded, setExpanded] = useState<string | null>('terms')
    const [loading, setLoading] = useState(false)
    const [read, setRead] = useState<Set<string>>(new Set())
    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(contractSchema),
        defaultValues: {
            fullName: "",
            designation: "",
            agreed: false,
        },
    });
    const toggle = (id: string) => {
        setExpanded(expanded === id ? null : id)
        setRead((p) => new Set(Array.from(p).concat(id)))
    }


    if (submitted) {
        return (
            <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
                <div style={{ background: '#fff', borderBottom: '1px solid #E8E8E8', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#FC8019', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#fff', fontSize: 16 }}>&#9679;</span>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 16, color: '#FC8019' }}>swiggy</span>
                    <span style={{ fontSize: 13, color: '#fff', background: '#1BA672', padding: '2px 10px', borderRadius: 4, marginLeft: 4 }}>Partner Onboarding</span>
                </div>
                <div style={{ maxWidth: 640, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E8F8F1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36 }}>&#10003;</div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1C1C1C', marginBottom: 12 }}>Onboarding Complete!</h2>
                    <p style={{ fontSize: 15, color: '#686B78', marginBottom: 8, lineHeight: 1.6 }}>Your restaurant has been successfully registered with Swiggy. Our team will review your application and get in touch within <strong>2-3 business days</strong>.</p>
                    <p style={{ fontSize: 14, color: '#93959F', marginBottom: 32 }}>Signed by <strong style={{ color: '#1C1C1C' }}>{name}</strong> ({designation})</p>
                    <div style={{ background: '#FFF3E8', border: '1px solid #FC8019', borderRadius: 10, padding: '16px 24px', display: 'inline-block' }}>
                        <p style={{ fontSize: 12, color: '#686B78', marginBottom: 4 }}>Reference ID</p>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#FC8019', fontFamily: 'monospace' }}>SWG-{new Date().getFullYear()}-{Math.floor(Math.random() * 900000 + 100000)}</p>
                    </div>
                </div>
            </div>
        )
    }
    const Handlesubmit = async (data: any) => {
        console.log("FORM DATA:", data);

        try {
            setLoading(true);

            const payload = {
                fullName: data.fullName,
                designation: data.designation,
                place: "Kolkata",
                declarationAccepted: data.agreed,
                date: new Date(),
                reviewedSections: [
                    "terms_of_service",
                    "commission_payment_terms",
                    "operational_guidelines",
                    "privacy_data_policy",
                ],
            };

            console.log("PAYLOAD:", payload);

            const response = await dispatch(
                restaurantContract(payload)
            ).unwrap();

            console.log("API RESPONSE:", response);

            if (response.success === true) {
                setCompletedSteps((prev) =>
                    prev.includes(3) ? prev : [...prev, 3]
                );

                setSubmitted(true);
                // nextStep removed
            }

            console.log("SUBMIT RESPONSE:", response);
            console.log("SUCCESS FLAG:", response?.success);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>


            <div style={{ display: 'flex', maxWidth: 1100, margin: '0 auto', padding: '32px 24px', gap: 32 }}>

                <form
                    onSubmit={handleSubmit(
                        (data) => {
                            console.log("SUCCESS");
                            console.log(data);

                            Handlesubmit(data);
                        },
                        (errors) => {
                            console.log("VALIDATION ERRORS");
                            console.log(errors);
                        }
                    )}
                >
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h1
                            style={{
                                fontSize: 22,
                                fontWeight: 700,
                                color: "#1C1C1C",
                                marginBottom: 24,
                            }}
                        >
                            Partner Contract
                        </h1>

                        <ReviewCard
                            CONTRACT_SECTIONS={CONTRACT_SECTIONS}
                            expanded={expanded}
                            read={read}
                            toggle={toggle}
                        />

                        <SignatureCard
                            errors={errors}
                            register={register}
                        />
                        <DeclarationCard
                            errors={errors}
                            name={name}
                            register={register}
                        />

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <button
                                type="button"
                                style={{
                                    background: "none",
                                    border: "1px solid #D4D5D9",
                                    borderRadius: 8,
                                    padding: "12px 28px",
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#686B78",
                                    cursor: "pointer",
                                }}
                            >
                                ← Back
                            </button>

                            <button
                                type="submit"
                                style={{
                                    background: "#FC8019",
                                    border: "none",
                                    borderRadius: 8,
                                    padding: "12px 36px",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                Submit & Complete Onboarding
                            </button>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    )
}


const errorStyle: React.CSSProperties = { fontSize: 12, color: '#E23744', marginTop: 6 }