import { FadeInView } from "@/motion/FadeInView";
import { Mail, Phone, Clock } from "lucide-react";
import Form from "./Form"; // Your client component
import { askTouchData } from "@/constants/data";

const ContactHome = () => {
  return (
    <section className="pb-20 pt-28 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Info Section */}
        <FadeInView className="space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <span className="text-emerald-600 font-semibold px-4 mb-8 py-1.5 bg-emerald-50 rounded-full text-sm">
              Contact us
            </span>
            <h2 className="text-4xl pt-10 md:text-5xl font-bold text-zinc-900 tracking-tight">
              We&apos;re here to help
            </h2>
            <p className="text-lg text-zinc-600 max-w-md leading-relaxed">
              Need a deep clean or pest control? We’re ready to assist. Reach
              out via email, call, or the form to see how Ask Touch transforms
              your space.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <Mail className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Email</p>
                <a
                  href="mailto:support@asktouch.com"
                  className="text-zinc-900 font-semibold hover:underline"
                >
                  support@asktouch.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <Phone className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Phone</p>
                <div className="flex flex-col mt-2 gap-1">
                  <a
                    href="tel:+2349034027582"
                    className="text-zinc-900 font-semibold hover:underline"
                  >
                    {askTouchData.contact.phone_numbers[0]}
                  </a>
                  <a
                    href="tel:+2349034027582"
                    className="text-zinc-900 mt-2 font-semibold hover:underline"
                  >
                    {askTouchData.contact.phone_numbers[1]}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">
                  Working Hours
                </p>
                <p className="text-zinc-900 font-semibold">
                  Monday to Saturday, 8 AM - 6 PM
                </p>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* Form Section */}
        <FadeInView className="order-1 lg:order-2">
          <div className="bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50 rounded-3xl p-8 md:p-10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-zinc-900">
                Let&apos;s talk
              </h3>
              <p className="text-zinc-500 text-sm mt-1">
                Tell us about your space and requirements.
              </p>
            </div>
            <Form />
            <p className="text-center text-[11px] text-zinc-400 mt-6">
              By submitting this form, you agree to our friendly{" "}
              <a href="#" className="underline hover:text-emerald-600">
                privacy policy
              </a>
              .
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};

export default ContactHome;
