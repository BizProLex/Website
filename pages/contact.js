import Section from '@/components/Section';

// GitHub Pages static hosting - using FormSubmit for contact form
const FORMSUBMIT_EMAIL = 'sujata.duge@bizprolex.com';
const WHATSAPP_NUMBER = '+9710567449815';
const WHATSAPP_MESSAGE = 'Hello, I would like to inquire about your legal services.';

export default function Contact() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <>
      <Section title="Contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4 text-black/90">
            <p><strong>M:</strong> +971 567449815</p>
            <p><strong>E:</strong> <a className="text-black underline" href="mailto:sujata.duge@bizprolex.com">sujata.duge@bizprolex.com</a></p>
            <p><strong>Web:</strong> <a className="text-black underline" href="https://bizprolex.com" target="_blank" rel="noreferrer">https://bizprolex.com</a></p>
            <p><strong>LinkedIn:</strong> <a className="text-black underline" href="https://www.linkedin.com/in/sujataduge/" target="_blank" rel="noreferrer">linkedin.com/in/sujataduge</a></p>
            
            {/* WhatsApp Contact Button */}
            <div className="mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.415"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <form
            className="grid grid-cols-1 gap-4"
            action={`https://formsubmit.co/${FORMSUBMIT_EMAIL}`}
            method="POST"
          >
            {/* Honeypot */}
            <input type="text" name="company" className="hidden" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <input type="hidden" name="_subject" value="New contact from bizprolex.com" />
            <input type="hidden" name="_cc" value="kerem@bizprolex.com" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="/thanks/" />
            <div>
              <label className="block text-sm font-medium text-black mb-1">Name</label>
              <input name="name" required className="w-full rounded-md border border-black/20 bg-white px-3 py-2 focus-visible:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Email</label>
              <input type="email" name="email" required className="w-full rounded-md border border-black/20 bg-white px-3 py-2 focus-visible:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Message</label>
              <textarea name="message" rows="5" required className="w-full rounded-md border border-black/20 bg-white px-3 py-2 focus-visible:ring-black" />
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-md bg-black px-5 py-2.5 text-white hover:bg-black/90">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
}