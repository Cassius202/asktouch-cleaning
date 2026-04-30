import { SubTitle, Title } from "@/templates/Headings";
import { ReviewBentoGrid } from "./ReviewBentoGrid";
import { Calendar, Star, ChevronRight } from "lucide-react";
import ArticlesPage from "./ArticlesPage";
import Link from "next/link";

export default async function ReviewsPage() {
  return (
    <div className="pt-22">
      <div className="px-4 text-heading flex flex-col ">
        <div className="uppercase text-sm text-emerald-600 text-center mb-6">
          Reviews
        </div>

        <Title mode="light" text="What our clients are saying" />
        <SubTitle
          text="Read what our clients have to say about Ask Touch Cleaning & Fumigation"
          mode="light"
        />
      </div>

      <div >
        <ReviewBentoGrid />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Book Now Button */}
        <Link
          href="/book"
          className="group relative overflow-hidden bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          <span>Book Now</span>
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Give a Review Button */}
        <Link
          href="/review-form"
          className="bg-white hover:bg-gray-50 text-emerald-700 font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-emerald-200 hover:border-emerald-300 transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <Star className="w-5 h-5 fill-emerald-600 text-emerald-600" />
          <span>Give us a review</span>
        </Link>
      </div>
      <ArticlesPage />
    </div>
  );
}
