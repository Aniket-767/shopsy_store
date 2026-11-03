import { Heart, ShieldCheck, Truck } from "lucide-react";

function About() {
  return (
    <section id="about" className="bg-white px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
            About Shopsy
          </p>

          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
            Shopping Made Simple
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            Shopsy is an e-commerce frontend project that brings fashion,
            accessories, footwear, and electronics together in one convenient
            shopping experience.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Our goal is to make browsing products, discovering deals, and
            managing your shopping cart easy and enjoyable.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-amber-50 p-5">
            <Heart className="mb-4 text-amber-600" size={28} />
            <h3 className="font-bold text-gray-900">Customer First</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              A simple shopping experience.
            </p>
          </div>

          <div className="rounded-2xl bg-amber-50 p-5">
            <ShieldCheck className="mb-4 text-amber-600" size={28} />
            <h3 className="font-bold text-gray-900">Easy Shopping</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Browse products with confidence.
            </p>
          </div>

          <div className="rounded-2xl bg-amber-50 p-5">
            <Truck className="mb-4 text-amber-600" size={28} />
            <h3 className="font-bold text-gray-900">Great Deals</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Discover products at special prices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;