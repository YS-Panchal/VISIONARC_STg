'use client';

export default function Contact() {
  return (
    <>
      <section id="contact" className="section">
        <div style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto',
          paddingLeft: '5%',
          paddingRight: '5%'
        }}>

          <div style={{ minHeight: '4.44vw' }}></div>
          
          <div className="contact_us_wrapper" style={{
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '100%',
            gap: '2rem',
            alignItems: 'flex-start'
          }}>
            <div className="contact_us_form_wrapper" style={{
              flex: '1',
              opacity: 1
            }}>
              <div className="title_wrapper gap_half" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '0.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                </div>
                <h2 className="title_h2" style={{
                  fontSize: 'clamp(2.5rem, 5.55vw, 5rem)',
                  lineHeight: 1.05,
                  fontWeight: 400,
                  margin: 0,
                  textTransform: 'uppercase',
                  textAlign: 'center'
                }}>Let&apos;s Talk</h2>
              </div>
              
              <div className="contact-us-form" style={{
                background: 'white',
                borderRadius: '1.25rem',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.03)'
              }}>
                <form id="wf-form-Contact-Us-Email-Form" name="wf-form-Contact-Us-Email-Form" method="get" className="contact-us-block-wrapper">
                  <div className="contact-us-flex-container">
                    <div className="contact-us-wrapper-half">
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="Full-Name" className="field_label">Name</label>
                        <input className="booking-text-field" maxLength={256} name="Full-Name" placeholder="Your Name and Surname" type="text" id="Full-Name" required />
                      </div>
                    </div>
                    <div className="contact-us-wrapper-half">
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="Customer-Email" className="field_label">Email</label>
                        <input className="booking-text-field" maxLength={256} name="Customer-Email" placeholder="Your Email" type="email" id="Customer-Email" required />
                      </div>
                    </div>
                  </div>
                  
                  <div className="contact-us-flex-container">
                    <div className="contact-us-wrapper-half">
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="Phone-Number" className="field_label">Phone Number</label>
                        <input className="booking-text-field" maxLength={256} name="Phone-Number" placeholder="Your Phone Number" type="tel" id="Phone-Number" required />
                      </div>
                    </div>
                    <div className="contact-us-wrapper-half">
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="Service" className="field_label">Service</label>
                        <div className="booking-select-field" style={{ width: '100%', position: 'relative' }}>
                          <select id="Service" name="Service" required className="select">
                            <option value="architecture">Architecture</option>
                            <option value="interior">Interior Design</option>
                            <option value="hospitality">Hospitality Architecture</option>
                            <option value="renovation">Renovation &amp; Planning</option>
                            <option value="other">Other</option>
                          </select>
                          <svg className="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2f3440" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.45 }}>
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="message-title-field-wrapper">
                    <label htmlFor="Customer-Message" className="field_label">Message Us</label>
                    <textarea id="Customer-Message" name="Customer-Message" maxLength={5000} placeholder="Message" required className="text-area"></textarea>
                    <div style={{ minHeight: '1rem' }}></div>
                    <input type="submit" className="button submit-button" style={{
                      backgroundColor: 'var(--charcoal-blue)',
                      color: '#fff',
                      letterSpacing: '.07vw',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      border: 'none',
                      borderRadius: '0.75rem',
                      padding: '1rem 2.5rem',
                      fontWeight: 400,
                      width: '100%',
                      marginTop: '1rem',
                      transition: 'all 0.3s ease'
                    }} value="Send Request" />
                  </div>
                </form>
              </div>
            </div>
            
            {/* If there was a right-hand side to the contact section in reference, it would go here. We're keeping the form wrapper. */}
          </div>
          
          <div style={{ minHeight: '4.44vw' }}></div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact_us_form_wrapper {
          width: 100%;
        }

        .contact-us-block-wrapper {
          width: 100%;
        }

        .contact-us-flex-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-top: .625rem;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .contact-us-wrapper-half {
          flex: 1;
          min-width: calc(50% - 1rem);
        }

        .field_label {
          color: #6b7280;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.625rem;
          font-family: sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .booking-text-field {
          border: 1px solid rgba(47, 52, 64, 0.08);
          background-color: #f7f6f3;
          color: #2f3440;
          border-radius: 0.75rem;
          width: 100%;
          min-height: 7svh;
          padding: 0.875rem 1.25rem;
          font-size: 1rem;
          font-weight: 400;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .booking-text-field::placeholder {
          color: rgba(47, 52, 64, 0.35);
        }
        
        .booking-text-field:focus {
           border-color: rgba(47, 52, 64, 0.25);
           box-shadow: 0 0 0 3px rgba(47, 52, 64, 0.06);
        }

        .select {
          background-color: #f7f6f3;
          color: #2f3440;
          padding: 0.875rem 2.75rem 0.875rem 1.25rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(47, 52, 64, 0.08);
          width: 100%;
          min-height: 7svh;
          font-size: 1rem;
          appearance: none;
          -webkit-appearance: none;
          outline: none;
          box-sizing: border-box;
          cursor: pointer;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .select:focus {
           border-color: rgba(47, 52, 64, 0.25);
           box-shadow: 0 0 0 3px rgba(47, 52, 64, 0.06);
        }

        .message-title-field-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: .625rem;
          width: 100%;
        }

        .text-area {
          border: 1px solid rgba(47, 52, 64, 0.08);
          background-color: #f7f6f3;
          color: #2f3440;
          border-radius: 0.75rem;
          min-height: 15svh;
          width: 100%;
          padding: 0.875rem 1.25rem;
          font-size: 1rem;
          font-weight: 400;
          box-sizing: border-box;
          outline: none;
          resize: vertical;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .text-area::placeholder {
          color: rgba(47, 52, 64, 0.35);
        }
        
        .text-area:focus {
           border-color: rgba(47, 52, 64, 0.25);
           box-shadow: 0 0 0 3px rgba(47, 52, 64, 0.06);
        }

        .submit-button:hover {
          background-color: #3d4350 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(47, 52, 64, 0.15);
        }

        @media (max-width: 768px) {
          .contact-us-wrapper-half {
            min-width: 100%;
          }
          .contact_us_wrapper {
            flex-direction: column;
          }
        }
      `}} />
    </>
  );
}
