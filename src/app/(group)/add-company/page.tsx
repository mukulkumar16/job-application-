//@ts-nocheck
'use client'

import { FormEvent, useState } from "react";

import {
  Building2,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function Page() {

  const [name, setname] = useState("");

  const [desc, setdesc] = useState("");

  const [loading, setLoading] = useState(false);



  async function handlecreate(
    e: FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const company = {
        name,
        description: desc,
      };

      const res = await fetch(
        "/api/company",
        {
          method: "POST",
          body: JSON.stringify(company),
        }
      );

      const data = await res.json();

      if (data.success) {

        alert("Company created successfully");

        setname("");
        setdesc("");

      } else {

        alert("Failed to create company");
      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);
    }
  }



  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        flex items-center justify-center
        px-4 py-10
      "
    >

      {/* CARD */}
      <div
        className="
          relative
          w-full max-w-lg
          rounded-[32px]
          border border-slate-800
          bg-slate-950/80
          backdrop-blur-xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* GLOW EFFECT */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-cyan-500/10
            via-transparent
            to-violet-500/10
            pointer-events-none
          "
        />



        <form
          onSubmit={handlecreate}
          className="
            relative
            p-6 sm:p-8 md:p-10
            space-y-7
          "
        >

          {/* HEADER */}
          <div className="text-center">

            <div
              className="
                mx-auto
                w-20 h-20
                rounded-3xl
                bg-gradient-to-br
                from-cyan-500 to-violet-600
                flex items-center justify-center
                shadow-xl mb-5
              "
            >
              <Sparkles
                className="text-white"
                size={34}
              />
            </div>

            <h2
              className="
                text-3xl
                md:text-4xl
                font-black
                text-white
              "
            >
              Create Company
            </h2>

            <p
              className="
                text-slate-400
                mt-3
                text-sm md:text-base
              "
            >
              Build your company profile and
              start posting jobs.
            </p>

          </div>



          {/* COMPANY NAME */}
          <div>

            <label
              className="
                flex items-center gap-2
                mb-3
                text-sm font-medium
                text-slate-300
              "
            >
              <Building2
                size={18}
                className="text-cyan-400"
              />

              Company Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setname(e.target.value)
              }
              placeholder="Enter company name"
              required
              className="
                w-full
                px-5 py-4
                rounded-2xl
                border border-slate-700
                bg-slate-900/80
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-500/20
                transition-all
              "
            />

          </div>



          {/* DESCRIPTION */}
          <div>

            <label
              className="
                flex items-center gap-2
                mb-3
                text-sm font-medium
                text-slate-300
              "
            >
              <FileText
                size={18}
                className="text-violet-400"
              />

              Company Description
            </label>

            <textarea
              value={desc}
              onChange={(e) =>
                setdesc(e.target.value)
              }
              placeholder="Describe your company..."
              rows={5}
              required
              className="
                w-full
                px-5 py-4
                rounded-2xl
                border border-slate-700
                bg-slate-900/80
                text-white
                placeholder:text-slate-500
                outline-none
                resize-none
                focus:border-violet-400
                focus:ring-2
                focus:ring-violet-500/20
                transition-all
              "
            />

          </div>



          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              flex items-center justify-center gap-3
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-violet-600
              text-white
              font-semibold
              shadow-xl
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
              disabled:opacity-70
            "
          >

            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Creating...
              </>
            ) : (
              <>
                <Building2 size={20} />
                Create Company
              </>
            )}

          </button>

        </form>
      </div>
    </div>
  );
}