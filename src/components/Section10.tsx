import type { ReactNode } from "react"
import ViewportFrame from "@/components/ViewportFrame"
import usePricingReveal, { revealClass } from "@/hooks/usePricingReveal"
import svgPaths from "@/imports/10V2State2-1/svg-sxvnmxr5yz"
import { imgHeadline, imgPrice } from "@/imports/10V2State2-1/svg-rcuro"

// Reproduces the corrected 10v2_state2 frame faithfully (paths referenced from
// the import), with the three new bullet groups (benefit-4/5/6) revealed on a
// once-only timed sequence after the section is first meaningfully viewed.

function bulletClass(shown: boolean) {
  return "absolute " + revealClass(shown)
}

export default function Section10({ overlay }: { overlay?: ReactNode }) {
  const { ref, revealed } = usePricingReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <ViewportFrame height={844} overlay={overlay}>
        <div className="relative size-full" data-name="10v2_state2">
          {/* black background */}
          <div className="absolute left-0 top-0 h-[844px] w-[390px] bg-black" />
          {/* CTA red rect (artwork; interactive overlay lives in App) */}
          <div
            className="absolute h-[63.027px] w-[306px] bg-[#bd3133]"
            style={{ left: 41, top: 696.99 }}
          />

          {/* button-text */}
          <div className="absolute inset-[84.64%_16.07%_11.96%_15.67%]">
            <svg
              className="absolute inset-0 block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 266.238 28.7265"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.p2e50400}
                fill="#FBF9F5"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* headline (masked vector — periods corrected) */}
          <div
            className="absolute inset-[7.91%_8.35%_84.23%_10.51%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[306px_66.387px]"
            style={{ maskImage: `url("${imgHeadline}")` }}
          >
            <svg
              className="absolute inset-0 block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 316.438 66.3499"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.p1da0ea00}
                fill="#FBF9F6"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* price (masked vector) */}
          <div
            className="absolute inset-[16.88%_30.85%_64.23%_10.51%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[202.271px_159.742px]"
            style={{ maskImage: `url("${imgPrice}")` }}
          >
            <svg
              className="absolute inset-0 block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 228.682 159.428"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.p39d89700}
                fill="#BD3133"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* benefit-1 */}
          <div className="absolute inset-[37.88%_48.98%_59.92%_10.8%]">
            <svg
              className="absolute inset-0 block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 156.88 18.5344"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.p32223500}
                fill="#BD3133"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p36f8c300}
                fill="#FBF9F6"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* benefit-2 */}
          <div className="absolute inset-[41.88%_42.7%_55.92%_10.8%]">
            <svg
              className="absolute inset-0 block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 181.37 18.5806"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.pbab4f00}
                fill="#BD3133"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p270a1c00}
                fill="#FBF9F6"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* benefit-3 */}
          <div className="absolute inset-[45.79%_27.23%_52.06%_10.8%]">
            <svg
              className="absolute inset-0 block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 241.708 18.1457"
            >
              <path
                clipRule="evenodd"
                d={svgPaths.p4f6ec00}
                fill="#BD3133"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p16ba3f00}
                fill="#FBF9F6"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* benefit-4 (new, animated) */}
          <div
            className={
              bulletClass(revealed >= 1) +
              " inset-[49.76%_24.12%_48.05%_10.77%]"
            }
          >
            <svg
              className="absolute inset-0 block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 253.94 18.5"
            >
              <path d={svgPaths.p1ccc2f00} fill="#BD3133" />
              <path
                clipRule="evenodd"
                d={svgPaths.p23e05b80}
                fill="#FBF9F5"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* benefit-5 (new, animated) */}
          <div
            className={
              bulletClass(revealed >= 2) +
              " inset-[53.79%_44.12%_44.02%_10.77%]"
            }
          >
            <svg
              className="absolute inset-0 block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 175.944 18.5"
            >
              <path d={svgPaths.p1c06e080} fill="#BD3133" />
              <path
                clipRule="evenodd"
                d={svgPaths.p1f547c80}
                fill="#FBF9F5"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* benefit-6 (new, animated) */}
          <div
            className={
              bulletClass(revealed >= 3) +
              " inset-[57.82%_36.95%_39.99%_10.77%]"
            }
          >
            <svg
              className="absolute inset-0 block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 203.91 18.5"
            >
              <path d={svgPaths.p3d1d900} fill="#BD3133" />
              <path
                clipRule="evenodd"
                d={svgPaths.p11876400}
                fill="#FBF9F5"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </ViewportFrame>
    </div>
  )
}
