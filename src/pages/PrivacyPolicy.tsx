import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-300 font-sans">
      <main className="flex-1">
        <section className="w-full py-10 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-16">
          <div className="container px-4 md:px-6">
            <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardHeader>
                <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight xl:text-5xl text-white">
                  Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  We collect the following information when you use our service:
                </p>
                <ul className="list-disc list-inside ml-4 mb-4">
                  <li>Your Google account email</li>
                  <li>Your name as provided by Google</li>
                  <li>Your Chess.com username (if provided)</li>
                  <li>Your YouTube channel ID</li>
                  <li>Your chess statistics from Chess.com</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc list-inside ml-4 mb-4">
                  <li>Provide and improve our services</li>
                  <li>Verify your Chess.com account</li>
                  <li>Display your chess statistics</li>
                  <li>Generate community statistics</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-4">3. Data Sharing and Disclosure</h2>
                <p className="mb-4">
                  We do not sell your personal information. We may share anonymized, aggregated data for community statistics.
                </p>

                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="mb-4">
                  We implement security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                </p>

                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                <p className="mb-4">
                  You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
                </p>

                <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
                <p className="mb-4">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </p>

                <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this privacy policy, please contact us at singhrakshit003@gmail.com.
                </p>

                <h2 className="text-2xl font-semibold mb-4">8. Google API Services User Data Policy</h2>
                <p className="mb-4">
                  BM Samay Raina's use and transfer of information received from Google APIs to any other app will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">Google API Services User Data Policy</a>, including the Limited Use requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-500">© 2024 BM SamayRaina. All rights reserved.</p>
      </footer>
    </div>
  );
}