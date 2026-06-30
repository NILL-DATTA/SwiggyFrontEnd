import React from 'react'

export default function ReviewCard({ CONTRACT_SECTIONS, expanded, read,toggle }) {
    return (
        <>
            <div style={{ background: '#fff', border: '1px solid #E8E8E8', borderRadius: 10, marginBottom: 16, overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #F0F0F5' }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1C1C1C', marginBottom: 4 }}>Review Contract Terms</h2>
                    <p style={{ fontSize: 13, color: '#686B78' }}>Please read through each section carefully before signing. All required sections must be reviewed.</p>
                </div>

                <div style={{ padding: '8px 0' }}>
                    {CONTRACT_SECTIONS.map((sec) => {
                        const isOpen = expanded === sec.id
                        const isRead = read.has(sec.id)
                        return (
                            <div key={sec.id} style={{ borderBottom: '1px solid #F0F0F5' }}>
                                <button
                                    onClick={() => toggle(sec.id)}
                                    style={{
                                        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                                        padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        textAlign: 'left',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{
                                            width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                                            background: isRead ? '#E8F8F1' : '#F0F0F5',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            border: isRead ? '1.5px solid #1BA672' : '1.5px solid #D4D5D9',
                                        }}>
                                            {isRead && <span style={{ color: '#1BA672', fontSize: 10, fontWeight: 700 }}>&#10003;</span>}
                                        </div>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: '#1C1C1C' }}>{sec.title}</span>
                                        {sec.required && <span style={{ fontSize: 11, color: '#FC8019', background: '#FFF3E8', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>Required</span>}
                                    </div>
                                    <span style={{ fontSize: 18, color: '#93959F', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'block', lineHeight: 1 }}>&#8964;</span>
                                </button>

                                {isOpen && (
                                    <div style={{ padding: '0 24px 20px 56px' }}>
                                        {sec.id === 'terms' && (
                                            <div style={contentStyle}>
                                                <p style={pStyle}>This Restaurant Partner Agreement (&quot;Agreement&quot;) is entered into between <strong>Bundl Technologies Pvt. Ltd.</strong> operating as Swiggy (&quot;Swiggy&quot;), and the Restaurant Partner named in the onboarding form (&quot;Partner&quot;).</p>
                                                <p style={pStyle}>By completing the onboarding process, the Partner agrees to list their restaurant on the Swiggy platform and fulfill orders placed by consumers through the app and website. This is a <strong>non-exclusive agreement</strong> — the Partner may operate on other platforms simultaneously.</p>
                                                <p style={pStyle}>The Partner acknowledges that Swiggy operates as a technology intermediary and marketplace, and does not take ownership of food items at any point in the fulfillment process.</p>
                                            </div>
                                        )}
                                        {sec.id === 'commission' && (
                                            <div style={contentStyle}>
                                                <p style={pStyle}>Swiggy will deduct a platform commission from each successfully delivered order. The applicable rate is communicated during onboarding and reflected in your Partner Portal dashboard.</p>
                                                <div style={{ background: '#F8F8F8', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
                                                        {['City Tier', 'Commission Range', 'Settlement'].map(h => (
                                                            <span key={h} style={{ fontSize: 11, fontWeight: 700, color: '#686B78', textTransform: 'uppercase' }}>{h}</span>
                                                        ))}
                                                    </div>
                                                    {[['Metro Cities', '18–22%', 'Weekly (T+7)'], ['Tier 2 Cities', '15–18%', 'Weekly (T+7)'], ['Tier 3 & Below', '12–15%', 'Biweekly']].map(([a, b, c]) => (
                                                        <div key={a} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '8px 0', borderTop: '1px solid #EBEBEB' }}>
                                                            <span style={{ fontSize: 13, color: '#1C1C1C' }}>{a}</span>
                                                            <span style={{ fontSize: 13, color: '#FC8019', fontWeight: 600 }}>{b}</span>
                                                            <span style={{ fontSize: 13, color: '#686B78' }}>{c}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p style={pStyle}>Payments are settled to the registered bank account. Swiggy reserves the right to revise commission rates with 30 days written notice to the Partner.</p>
                                            </div>
                                        )}
                                        {sec.id === 'ops' && (
                                            <div style={contentStyle}>
                                                <p style={pStyle}>The Partner agrees to maintain the following operational standards at all times:</p>
                                                {['Maintain a valid FSSAI license and share a copy with Swiggy upon request.', 'Maintain an order acceptance rate of at least 85%.', 'Ensure all menu items are accurately priced and marked unavailable when out of stock.', 'Use tamper-evident, hygienic packaging for all deliveries.', 'Maintain a minimum consumer rating of 3.5 / 5.0 on the platform.', 'Respond to consumer complaints within 24 hours through the Partner Portal.'].map((item, i) => (
                                                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                                                        <span style={{ color: '#1BA672', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>&#10003;</span>
                                                        <span style={{ fontSize: 13, color: '#3D4152', lineHeight: 1.6 }}>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {sec.id === 'ip' && (
                                            <div style={contentStyle}>
                                                <p style={pStyle}>The Partner grants Swiggy a non-exclusive, royalty-free license to use the restaurant name, logo, food photographs, and menu content for the purposes of operating and promoting the Listing on the Platform. This license ends upon termination of the Agreement.</p>
                                                <p style={pStyle}>Swiggy grants the Partner a limited license to use the Swiggy Partner badge in accordance with brand guidelines. Unauthorized use of Swiggy trademarks is strictly prohibited.</p>
                                            </div>
                                        )}
                                        {sec.id === 'privacy' && (
                                            <div style={contentStyle}>
                                                <p style={pStyle}>Swiggy collects and processes restaurant and owner data for the purpose of operating the platform, processing payments, and improving services. This data is handled in accordance with applicable Indian data protection laws.</p>
                                                <p style={pStyle}>The Partner shall not misuse consumer data received through the Platform. Consumer contact details may only be used for order fulfillment and must not be retained beyond the delivery period.</p>
                                                <p style={pStyle}>Both parties agree to maintain confidentiality of proprietary business information shared under this Agreement. Confidentiality obligations survive termination for a period of 3 years.</p>
                                            </div>
                                        )}
                                        {sec.id === 'termination' && (
                                            <div style={contentStyle}>
                                                <p style={pStyle}>Either party may terminate this Agreement with <strong>30 days written notice</strong>. Swiggy may terminate immediately in cases of food safety violations, fraud, or repeated failure to meet performance standards.</p>
                                                <p style={pStyle}>Upon termination, the Partner Listing will be removed within 48 hours and all outstanding settlements will be processed within 14 business days.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
const contentStyle: React.CSSProperties = { fontSize: 13, color: '#3D4152', lineHeight: 1.7 }
const pStyle: React.CSSProperties = { marginBottom: 12, fontSize: 13, color: '#3D4152', lineHeight: 1.7 }
