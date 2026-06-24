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
          <div style={{ minHeight: '8.89vw' }}></div>
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
                  <h6 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>get in touch</h6>
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
              
              <div className="contact-us-form">
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
                        <div className="booking-select-field" style={{ width: '100%' }}>
                          <select id="Service" name="Service" required className="select">
                            <option value="">Select a Service</option>
                            <option value="architecture">Architecture &amp; Design</option>
                            <option value="interior">Interior Design</option>
                            <option value="landscape">Landscape &amp; Urban Planning</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="message-title-field-wrapper">
                    <label htmlFor="Customer-Message" className="field_label">Message Us</label>
                    <textarea id="Customer-Message" name="Customer-Message" maxLength={5000} placeholder="Message" required className="text-area"></textarea>
                    <div style={{ minHeight: '1rem' }}></div>
                    <input type="submit" className="button" style={{
                      backgroundColor: 'var(--charcoal-blue)',
                      color: '#fff',
                      letterSpacing: '.07vw',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      border: '1px solid #000',
                      borderRadius: '6.25rem',
                      padding: '.78vw 2.22vw',
                      fontWeight: 400,
                      width: '100%',
                      marginTop: '1rem'
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
          color: #2f3440;
          letter-spacing: .05em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          font-family: sans-serif;
          font-size: .75rem;
          font-weight: 500;
        }

        .booking-text-field {
          border: .0625rem solid transparent;
          background-color: #f5f5f5;
          color: #2f3440;
          border-radius: 0;
          width: 100%;
          min-height: 7svh;
          padding-left: 1rem;
          font-size: 1rem;
          font-weight: 400;
          box-sizing: border-box;
          outline: none;
        }

        .booking-text-field::placeholder {
          color: #1a1a1a;
          opacity: 0.6;
        }
        
        .booking-text-field:focus {
           border-color: #2f3440;
        }

        .select {
          background-color: #f5f5f5;
          color: #2f3440;
          padding: 1rem;
          border-radius: 0;
          border: .0625rem solid transparent;
          width: 100%;
          min-height: 7svh;
          font-size: 1rem;
          appearance: none;
          outline: none;
          box-sizing: border-box;
        }
        
        .select:focus {
           border-color: #2f3440;
        }

        .message-title-field-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: .625rem;
          width: 100%;
        }

        .text-area {
          border: .0625rem solid transparent;
          background-color: #f5f5f5;
          color: #2f3440;
          border-radius: .3125rem;
          min-height: 15svh;
          width: 100%;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 400;
          box-sizing: border-box;
          outline: none;
          resize: vertical;
        }

        .text-area::placeholder {
          color: #1a1a1a;
          opacity: 0.6;
        }
        
        .text-area:focus {
           border-color: #2f3440;
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
