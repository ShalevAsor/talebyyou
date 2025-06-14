// import { type Metadata } from "next";
// import { ClerkProvider } from "@clerk/nextjs";
// import { Geist, Geist_Mono } from "next/font/google";
// import Script from "next/script"; // ADD THIS IMPORT
// import "./globals.css";
// import { Providers } from "@/components/providers/Providers";
// import { createMetadata, siteConfig } from "@/config/site";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/next";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap",
//   preload: true,
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap",
//   preload: false,
// });

// export const metadata: Metadata = {
//   ...createMetadata(),
//   metadataBase: new URL(siteConfig.url),
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider afterSignOutUrl={"/"}>
//       <html lang="en">
//         <body
//           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         >
//           {/* Pinterest Tag */}
//           <Script
//             id="pinterest-tag"
//             strategy="afterInteractive"
//             dangerouslySetInnerHTML={{
//               __html: `
//                 !function(e){if(!window.pintrk){window.pintrk = function () {
//                 window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0]; r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
//                 pintrk('load', '2613699457142');
//                 pintrk('page');
//               `,
//             }}
//           />

//           <noscript>
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               height="1"
//               width="1"
//               style={{ display: "none" }}
//               alt=""
//               src="https://ct.pinterest.com/v3/?event=init&tid=2613699457142&noscript=1"
//             />
//           </noscript>

//           <Providers>
//             {children}
//             <SpeedInsights />
//             <Analytics />
//           </Providers>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { createMetadata, siteConfig } from "@/config/site";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  ...createMetadata(),
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Meta Pixel Code */}
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '721005267541076');
                fbq('track', 'PageView');
              `,
            }}
          />

          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src="https://www.facebook.com/tr?id=721005267541076&ev=PageView&noscript=1"
            />
          </noscript>

          <Providers>
            {children}
            <SpeedInsights />
            <Analytics />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
