import React from "react";
import { get } from "lodash";
import Link from "next/link";

// components
// import ThemeLogo from "../../components/ui/ThemeLogo";
import LinkFooter from "./LinkFooter";
import { Icon } from "@/components/ui/Icon";
import { IconSvg } from "@/components/ui/IconSvg";

// constants
const share = {
  global: "https://dagora.xyz",
  discord: "https://dagora.link/discord",
  "twitter-x": "https://twitter.com/dagoraxyz",
  telegram: "https://t.me/dagora_announcements",
};

const footerConfig = [

  {
    title: "Assets",
    content: [
      {
        label: "Branding",
        isInternal: false,
        url: "https://dagora.link/branding",
      },
      {
        label: "Blog",
        isInternal: false,
        url: "https://blog.dagora.xyz",
      },
    ],
  },
];

const MainFooter = () => {
  return (
    <footer className="container mt-12  ipad:mb-16 py-10">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col gap-6 flex-[1_0_40%] mb-8 md:mb-0 px-6">
          <Link prefetch={false} href="/">
            <IconSvg.Logo />
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
        <div className="flex justify-end gap-6 flex-wrap flex-[1_0_60%] text-end px-6">
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
    </footer>
  );
};

export default MainFooter;
