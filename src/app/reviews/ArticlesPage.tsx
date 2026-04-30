import { FadeInView } from "@/motion/FadeInView";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ArticlesPage = () => {
  return (
    <section className="py-12 px-6">
      <FadeInView className="max-w-7xl mx-auto bg-emerald-50 rounded-[40px] p-8 md:p-16 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Side */}
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl lg:text-5xl font-bold text-emerald-950 leading-[1.1] tracking-tight">
              Clean Doesn’t End at <br /> 
              the Door — <span className="italic font-serif font-medium">It Grows Here</span>
            </h2>
            
            <p className="text-lg text-emerald-900/70 max-w-md leading-relaxed">
              A well-run space is built over time. Our insights help you 
              maintain order, protect your environment, and make smarter 
              decisions about your home or workplace.
            </p>

            <Link 
              href="/blogs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-950 text-white font-semibold rounded-2xl hover:bg-emerald-900 transition-all active:scale-[0.98] w-max group"
            >
              View More Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2 relative md:max-xl:aspect-3/4 aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden border border-yellow-200 shadow-emerald-900/20">
            <Image
              src="https://images.unsplash.com/photo-1669101602108-fa5ba89507ee?w=1500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNsZWFuaW5nfGVufDB8fDB8fHww" // Reference the visual style of image_a7c9bb.jpg
              alt="Professional cleaning in progress"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </FadeInView>
    </section>
  );
};

export default ArticlesPage;