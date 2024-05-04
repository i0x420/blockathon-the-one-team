import React from "react";
import { get } from "lodash";
import Link from "next/link";

// components
// import ThemeLogo from "../../components/ui/ThemeLogo";
import LinkFooter from "./LinkFooter";
import { Icon } from "@/components/ui/Icon";

// constants
const share = {
  global: "https://dagora.xyz",
  discord: "https://dagora.link/discord",
  "twitter-x": "https://twitter.com/dagoraxyz",
  telegram: "https://t.me/dagora_announcements",
};

const footerConfig = [
  {
    title: "home_footer_title_marketplace",
    content: [
      {
        label: "common_launchpad",
        isInternal: true,
        url: "/launchpad",
      },
      {
        label: "home_footer_value_hotDrops",
        isInternal: true,
        url: "/hotdrops",
      },
      {
        label: "home_footer_value_apply_for_launch",
        isInternal: false,
        url: "https://dagora.link/launchpad-form",
      },
    ],
  },
  {
    title: "home_footer_title_help",
    content: [
      {
        label: "home_footer_value_support",
        isInternal: false,
        url: "https://dagora.link/discord",
      },
      {
        label: "home_footer_value_beginnerGuide",
        isInternal: false,
        url: "https://docs.dagora.xyz/beginners-guide/basics",
      },
      {
        label: "home_footer_value_faq",
        isInternal: false,
        url: "https://docs.dagora.xyz/beginners-guide/faqs",
      },
    ],
  },
  {
    title: "home_footer_title_company",
    content: [
      {
        label: "home_footer_value_branding",
        isInternal: false,
        url: "https://dagora.link/branding",
      },
      {
        label: "home_footer_value_blog",
        isInternal: false,
        url: "https://blog.dagora.xyz",
      },
    ],
  },
  {
    title: "home_footer_title_legal",
    content: [
      {
        label: "home_footer_value_copyrightPolicy",
        isInternal: false,
        url: "https://docs.dagora.xyz/legal/copyright-dispute-policy",
      },
      {
        label: "home_footer_value_termsOfService",
        isInternal: false,
        url: "https://docs.dagora.xyz/legal/terms-of-service",
      },
      {
        label: "home_footer_value_privacyPolicy",
        isInternal: false,
        url: "https://docs.dagora.xyz/legal/privacy-policy",
      },
    ],
  },
];

const MainFooter = () => {
  return (
    <footer className="container mt-12  ipad:mb-16 py-10">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-6 flex-[1_0_40%] mb-8 md:mb-0">
          <Link prefetch={false} href="/">
            Theme logo
            {/* <ThemeLogo width={150} height={40} /> */}
          </Link>
          <div className="flex items-center gap-8 text-text-secondary">
            {Object.keys(share).map((key) => (
              <a
                target="_blank"
                className="hover:text-text-primary duration-300"
                key={key}
                href={get(share, key, "#")}
                rel="noreferrer"
              >
                <Icon iconName={key} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-6 flex-wrap flex-[1_0_60%]">
          {footerConfig.map((item) => (
            <div
              key={get(item, "title")}
              className="flex flex-col flex-[1_0_calc(50%_-_theme(spacing.6))] md:flex-1"
            >
              <span className="font-bold text-text-primary text-base">
                {get(item, "title")}
              </span>
              <ul>
                {item.content.map((content) => (
                  <LinkFooter
                    key={get(content, "label")}
                    label={get(content, "label")}
                    url={get(content, "url")}
                    isInternal={get(content, "isInternal")}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-text-primary text-sm font-semibold mt-8">
        home_footer_value_companyCopyright
      </p>
    </footer>
  );
};

export default MainFooter;
