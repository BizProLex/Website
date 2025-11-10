import Section from '@/components/Section';

// GitHub Pages static hosting - using FormSubmit for contact form
const FORMSUBMIT_EMAIL = 'sujata.duge@bizprolex.com';

export default function Contact() {
  return (
    <>
      <Section title="Contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4 text-black/90">
            <p><strong>M:</strong> +971 567449815</p>
            <p><strong>E:</strong> <a className="text-black underline" href="mailto:sujata.duge@bizprolex.com">sujata.duge@bizprolex.com</a></p>
            <p><strong>Web:</strong> <a className="text-black underline" href="https://bizprolex.com" target="_blank" rel="noreferrer">https://bizprolex.com</a></p>
            <p><strong>LinkedIn:</strong> <a className="text-black underline" href="https://www.linkedin.com/in/sujataduge/" target="_blank" rel="noreferrer">linkedin.com/in/sujataduge</a></p>
            

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