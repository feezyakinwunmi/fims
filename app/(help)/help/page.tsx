import {Footer} from '../../(root)/components/footer';
import {Header} from '../../(root)/components/header';

export const HelpPage = () => {
    return (
        <>
            <Header/>
      <div className="min-h-screen bg-gray-50 py-12 mt-[120px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
            Help & Support
          </h1>
  
          {/* Farm Inventory Usefulness Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Use Fims?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Fims is your all-in-one solution for managing your farm inventory
              efficiently and effectively. Whether you're a small-scale farmer or
              managing a large agricultural operation, Fims helps you keep
              track of crops, livestock, equipment, and supplies with ease. Our
              platform provides real-time updates, detailed reports, and intuitive
              tools to streamline your farm management process. With Fims, you
              can monitor inventory levels, plan for seasonal changes, and make
              data-driven decisions to maximize productivity and profitability. Say
              goodbye to manual record-keeping and hello to a smarter, more
              organized way of managing your farm.
            </p>
          </section>
  
          {/* Q&A Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
  
            {/* Q&A List */}
            <div className="space-y-6">
              {/* Question 1 */}
              <div>
                <h3 className="text-xl font-medium text-eweko_green mb-2">
                  How do I add items to my inventory?
                </h3>
                <p className="text-gray-600">
                  To add items, log in to your account, navigate to the "Category"
                  section, and click the "Add Item" button. Fill in the required
                  details (e.g., item name, quantity, category) and save your entry.
                </p>
              </div>
  
              {/* Question 2 */}
              <div>
                <h3 className="text-xl font-medium text-eweko_green mb-2">
                  Can I track multiple farms on one account?
                </h3>
                <p className="text-gray-600">
                  Yes, Fims allows you to manage multiple farms under a single
                  account. Simply create separate profiles for each farm and switch
                  between them as needed.
                </p>
              </div>
  
              {/* Question 3 */}
              <div>
                <h3 className="text-xl font-medium text-eweko_green mb-2">
                  How do I generate reports?
                </h3>
                <p className="text-gray-600">
                  Go to the "Reports" section, select the type of report you need
                  (e.g., inventory levels, sales, expenses), and choose the date
                  range. Click "Generate Report" to download or view the data.
                </p>
              </div>
  
              {/* Question 4 */}
              <div>
                <h3 className="text-xl font-medium text-eweko_green mb-2">
                  Is my data secure?
                </h3>
                <p className="text-gray-600">
                  Absolutely. Fims uses advanced encryption and security
                  measures to protect your data. Your information is safe and
                  accessible only to you.
                </p>
              </div>
            </div>
          </section>
  
          {/* Customer Care Section */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Need More Help?
            </h2>
            <p className="text-gray-600 mb-4">
              Our customer care team is here to assist you. Feel free to reach out
              for any questions or issues.
            </p>
            <p className="text-eweko_green font-medium">
              Customer Care Line:{" "}
              <a
                href="tel:+2349161460898"
                className="underline hover:text-green-800"
              >
                +234 916 146 0898
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer/>
        </>
    
    );
  };
  export default HelpPage;