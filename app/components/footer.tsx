"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Top Section */}
            <div className="container mx-auto">
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Logo and Copyright */}
                    <div className="space-y-4">
                        <Image
                            src="/logo/logo_white_small.png"
                            alt="Guhuza Logo"
                            width={150}
                            height={50}
                            className="w-32"
                        />
                        <p className="text-sm">Copyright ©2025 Guhuza.</p>
                        <p className="text-sm">v3.4.4</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="space-y-4">
                        <p className="font-semibold">GET SOCIAL WITH US!</p>
                        <div className="flex space-x-4">
                            {/* social links */}
                            {[
                                { href: "https://www.linkedin.com/company/guhuza", icon: "linkedin" },
                                { href: "https://www.facebook.com/Guhuza-103434808683693", icon: "facebook" },
                                { href: "https://twitter.com/guhuza_", icon: "twitter" },
                                { href: "https://www.instagram.com/guhuza_/", icon: "instagram" },
                                { href: "https://www.youtube.com/watch?v=q8xWi5LYa8E", icon: "youtube" },
                                { href: "https://www.tiktok.com/@guhuza", icon: "tiktok" },
                                { href: "https://open.spotify.com/show/4jQy8DF6ut5lHxpYMjKxA2", icon: "spotify" },
                            ].map(({ href, icon }) => (
                                <Link key={icon} href={href} target="_blank">
                                    <Image src={`/icons/${icon}.svg`} alt={icon} width={24} height={24} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Company Info */}
                    <div className="space-y-4">
                        <h6 className="font-semibold">Company Info</h6>
                        <Link href="https://guhuza.com/about-us" target="_blank" className="block text-sm hover:underline">
                            About Us
                        </Link>
                        <Link href="mailto:investors@guhuza.com" className="block text-sm hover:underline">
                            Investor Relations
                        </Link>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h6 className="font-semibold">Legal</h6>
                        <Link href="https://guhuza.com/privacy-policy" target="_blank" className="block text-sm hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="https://guhuza.com//terms-of-use" target="_blank" className="block text-sm hover:underline">
                            Terms & Conditions
                        </Link>
                        <Link href="https://guhuza.com/cookie-policy" target="_blank" className="block text-sm hover:underline">
                            Cookie Policy
                        </Link>
                        <Link href="https://guhuza.com/subscription-agreement" target="_blank" className="block text-sm hover:underline">
                            Subscription Agreement
                        </Link>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h6 className="font-semibold">Support</h6>
                        <Link href="https://guhuza.com/contact" target="_blank" className="block text-sm hover:underline">
                            Contact Us
                        </Link>
                        <Link href="https://guhuza.com/help" target="_blank" className="block text-sm hover:underline">
                            Help
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Dark mode fix */}
            <div className="bg-gray-100 dark:bg-black py-8 text-gray-800 dark:text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Powered By */}
                        <div className="space-y-4">
                            <h6 className="font-semibold">Powered by:</h6>
                            <Link href="http://www.TorontoJobs.ca" target="_blank">
                                <Image
                                    src="/toronto-jobs/logo3.png"
                                    alt="Toronto Jobs"
                                    width={150}
                                    height={50}
                                    className="w-32"
                                />
                            </Link>
                        </div>

                        {/* Download App */}
                        <div className="space-y-4">
                            <p className="font-semibold">Download the app</p>
                            <div className="flex space-x-4">
                                <Link
                                    href="https://apps.apple.com/ca/app/guhuza/id1611562767?platform=iphone"
                                    target="_blank"
                                >
                                    <Image
                                        src="/images/footer/download_app_store.png"
                                        alt="Download iOS App"
                                        width={120}
                                        height={40}
                                    />
                                </Link>
                                <Link
                                    href="https://play.google.com/store/apps/details?id=com.guhuza.app"
                                    target="_blank"
                                >
                                    <Image
                                        src="/images/footer/download_google_play.png"
                                        alt="Download Android App"
                                        width={120}
                                        height={40}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
