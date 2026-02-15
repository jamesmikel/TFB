import Heading from "./Header";
import Footer from "./Footer";
export default function PrivacyPolicy() {
  return (
    <div>
      <Heading />
      <h1 className="Privacy"> Trusted-Finance.biz Privacy Statement</h1>
      <div
        className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100"
        style={{ fontFamily: "Montserrat" }}
      >
        {/* Header / Hero Section */}
        <div className="bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border-b border-purple-800/30 py-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-purple-300 max-w-2xl mx-auto">
            TrustedFinance.biz – Protecting Your Trust & Data
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Last updated: January 22, 2026
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 prose prose-invert prose-headings:text-purple-300 prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-li:text-gray-300">
          <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl">
            <p className="text-lg leading-relaxed mb-8">
              At <strong>TrustedFinance.biz</strong>, your privacy and the
              security of your personal information are our top priorities. This
              Privacy Policy explains what information we collect, how we use
              it, who we share it with, and your rights regarding your data.
            </p>

            <p className="mb-8">
              By using our website, mobile application, or any of our services
              (collectively, the "Services"), you agree to the practices
              described in this Privacy Policy. If you do not agree, please do
              not use our Services.
            </p>

            <hr className="border-gray-700 my-10" />

            <h2 className="text-3xl font-bold mb-6">
              1. Information We Collect
            </h2>

            <h3 className="text-2xl font-semibold mt-10 mb-4">
              A. Information You Provide Directly
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Account & Profile:</strong> full name, username, email
                address, password (hashed), phone number (optional), profile
                picture
              </li>
              <li>
                <strong>Wallet & Transaction:</strong> cryptocurrency wallet
                addresses (BTC, ETH, BNB, TRON, USDT-TRC20), deposit/withdrawal
                records
              </li>
              <li>
                <strong>Referral:</strong> referrer username/code (if you signed
                up via referral link)
              </li>
              <li>
                <strong>Support & Communication:</strong> messages, tickets,
                chat logs, emails you send us
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-10 mb-4">
              B. Information Collected Automatically
            </h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Device & Network:</strong> IP address, browser
                type/version, operating system, device ID, language, time zone
              </li>
              <li>
                <strong>Usage:</strong> pages visited, time spent, click
                patterns, referral source
              </li>
              <li>
                <strong>Security:</strong> login attempts, failed logins, 2FA
                usage, session duration
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-10 mb-4">
              C. Information from Third Parties
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Blockchain transaction data (publicly available on-chain)</li>
              <li>Identity verification partners (if KYC is used)</li>
              <li>Analytics providers (e.g., Google Analytics)</li>
            </ul>

            <hr className="border-gray-700 my-12" />

            <h2 className="text-3xl font-bold mb-6">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Provide, maintain, and secure your account</li>
              <li>Process deposits, withdrawals, and trades</li>
              <li>Perform identity verification and AML/KYC compliance</li>
              <li>
                Detect, prevent, and investigate fraud or illegal activity
              </li>
              <li>Communicate important account & security updates</li>
              <li>Improve our Services (analytics, feature development)</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Send marketing messages (only with your consent)</li>
            </ul>

            <hr className="border-gray-700 my-12" />

            <h2 className="text-3xl font-bold mb-6">
              3. Sharing Your Information
            </h2>
            <p className="mb-6">
              We <strong>do not sell</strong> your personal data. We share
              information only in these limited cases:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Service Providers:</strong> cloud hosting, email,
                analytics, KYC/AML providers (under strict contracts)
              </li>
              <li>
                <strong>Legal & Regulatory:</strong> courts, regulators, law
                enforcement when required by law
              </li>
              <li>
                <strong>Business Transfers:</strong> merger, acquisition, or
                sale of assets
              </li>
              <li>
                <strong>With Your Consent:</strong> when you explicitly agree
              </li>
            </ul>

            <hr className="border-gray-700 my-12" />

            <h2 className="text-3xl font-bold mb-6">
              4. Cookies & Tracking Technologies
            </h2>
            <p className="mb-6">
              We use cookies and similar technologies to keep you logged in,
              remember preferences, analyze usage, and prevent fraud.
            </p>
            <p>
              You can manage cookies in your browser settings. Disabling some
              may limit functionality.
            </p>

            <hr className="border-gray-700 my-12" />

            <h2 className="text-3xl font-bold mb-6">5. Data Security</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Encryption in transit (TLS 1.3) and at rest</li>
              <li>httpOnly, Secure, SameSite cookies for authentication</li>
              <li>Two-factor authentication (2FA) available</li>
              <li>Regular security audits & penetration testing</li>
              <li>Limited access to authorized personnel only</li>
            </ul>
            <p className="mt-6">
              No system is 100% secure. In case of a breach, we will notify
              affected users as required by law.
            </p>

            <hr className="border-gray-700 my-12" />

            <h2 className="text-3xl font-bold mb-6">6. Your Rights</h2>
            <p className="mb-6">
              Depending on your location (e.g., GDPR, CCPA, NDPR), you may have
              rights to:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>Access, correct, or delete your data</li>
              <li>Object to or restrict processing</li>
              <li>Withdraw consent</li>
              <li>Data portability</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-6">
              To exercise your rights, contact us at{" "}
              <a
                href="mailto:support@trustedfinance.biz"
                className="text-purple-400 hover:underline"
              >
                privacy@trustedfinance.biz
              </a>
              .
            </p>

            <hr className="border-gray-700 my-12" />

            <h2 className="text-3xl font-bold mb-6">
              7. International Data Transfers
            </h2>
            <p>
              Your data may be transferred to and processed in countries outside
              your home country. We use appropriate safeguards (e.g., Standard
              Contractual Clauses) to protect your data.
            </p>

            <hr className="border-gray-700 my-12" />

            <h2 className="text-3xl font-bold mb-6">8. Children’s Privacy</h2>
            <p>
              Our Services are not intended for individuals under 18. We do not
              knowingly collect data from children. If we become aware of such
              data, we will delete it.
            </p>

            <hr className="border-gray-700 my-12" />

            <h2 className="text-3xl font-bold mb-6">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy. The new version will be posted
              here with an updated “Last updated” date. Significant changes will
              be notified via email or in-app notice.
            </p>

            <hr className="border-gray-700 my-12" />

            <h2 className="text-3xl font-bold mb-6">10. Contact Us</h2>
            <div className="bg-purple-950/30 border border-purple-800/40 rounded-xl p-6">
              <p className="mb-4">
                If you have questions about this Privacy Policy or our data
                practices:
              </p>
              <p className="font-medium">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@trustedfinance.biz"
                  className="text-purple-400 hover:underline"
                >
                  privacy@trustedfinance.biz
                </a>
              </p>
              <p className="font-medium">
                <strong>Address:</strong> TrustedFinance.biz – Privacy Team
                <br />
              </p>
            </div>

            <p className="text-center mt-12 text-gray-400">
              Thank you for trusting us with your information. We’re committed
              to keeping it safe while delivering the best trading experience
              possible. 🚀
            </p>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "100px" }}></div>
      <Footer />
    </div>
  );
}
