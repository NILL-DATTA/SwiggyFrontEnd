import React from "react";
import { UseFormRegister } from "react-hook-form";

interface SignatureCardProps {
    errors: any;
    register: UseFormRegister<any>;
}

export default function SignatureCard({
    errors,
    register,
}: SignatureCardProps) {
    
    return (
        <div
            style={{
                background: "#fff",
                border: "1px solid #E8E8E8",
                borderRadius: 10,
                marginBottom: 16,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    padding: "20px 24px",
                    borderBottom: "1px solid #F0F0F5",
                }}
            >
                <h2
                    style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#1C1C1C",
                        marginBottom: 4,
                    }}
                >
                    Authorized Signatory Details
                </h2>

                <p
                    style={{
                        fontSize: 13,
                        color: "#686B78",
                    }}
                >
                    Enter the details of the person authorized to sign this agreement.
                </p>
            </div>

            <div style={{ padding: "24px" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 16,
                        marginBottom: 16,
                    }}
                >
                    {/* Full Name */}
                    <div>
                        <label style={labelStyle}>
                            Full Name <span style={{ color: "#FC8019" }}>*</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Authorized signatory name"
                            {...register("fullName")}
                            style={{
                                ...inputStyle,
                                borderColor: errors?.fullName ? "#E23744" : "#D4D5D9",
                            }}
                        />

                        {errors?.fullName?.message && (
                            <p style={errorStyle}>
                                {String(errors.fullName.message)}
                            </p>
                        )}
                    </div>

                    {/* Designation */}
                    <div>
                        <label style={labelStyle}>
                            Designation <span style={{ color: "#FC8019" }}>*</span>
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Owner, Director"
                            {...register("designation")}
                            style={{
                                ...inputStyle,
                                borderColor: errors?.designation
                                    ? "#E23744"
                                    : "#D4D5D9",
                            }}
                        />

                        {errors?.designation?.message && (
                            <p style={errorStyle}>
                                {String(errors.designation.message)}
                            </p>
                        )}
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 16,
                    }}
                >
                    <div>
                        <label style={labelStyle}>Date</label>

                        <input
                            type="text"
                            value={new Date().toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                            readOnly
                            style={{
                                ...inputStyle,
                                background: "#F8F8F8",
                                color: "#686B78",
                            }}
                        />
                    </div>

                    <div>
                        <label style={labelStyle}>Place</label>

                        <input
                            type="text"
                            value="Kolkata"
                            readOnly
                            style={{
                                ...inputStyle,
                                background: "#F8F8F8",
                                color: "#686B78",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#3D4152",
    marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1.5px solid #D4D5D9",
    fontSize: 14,
    color: "#1C1C1C",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
};

const errorStyle: React.CSSProperties = {
    fontSize: 12,
    color: "#E23744",
    marginTop: 6,
};