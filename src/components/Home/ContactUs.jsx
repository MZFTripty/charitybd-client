

function ContactUs() {
    return (
        <div className="bg-gray-100 py-16 max-w-4xl mx-auto rounded-2xl mb-12 shadow-2xl mt-16">
            <div className="text-center">
                <h2 className="text-3xl font-semibold text-purple-800">Contact Us</h2>
                <p className="mt-4 text-gray-600">
                    Have questions or need assistance? We're here to help. Feel free to reach out to us through the following channels:
                </p>
            </div>
            <div className="mt-12 flex flex-wrap justify-center items-center">
                <div className="w-full md:w-1/3 text-center">
                    <p className="text-lg text-gray-700 font-semibold">
                        Email Us
                    </p>
                    <a href="mailto:contact@example.com" className="text-blue-500 hover:underline">zarinfatematripty@gmail.com</a><br />
                    {/* <a href="mailto:contact@example.com" className="text-blue-500 hover:underline">zarinfatematripty@gmail.com</a><br /> */}
                    <a href="mailto:contact@example.com" className="text-blue-500 hover:underline">tania.ponni.2003@gmail.com</a>
                </div>
                <div className="w-full md:w-1/3 text-center">
                    <p className="text-lg text-gray-700 font-semibold">
                        Call Us
                    </p>
                    <a href="tel:+123456789" className="text-blue-500 hover:underline">+8801*******</a><br />
                    {/* <a href="tel:+123456789" className="text-blue-500 hover:underline">+8801*******</a><br /> */}
                    <a href="tel:+123456789" className="text-blue-500 hover:underline">+8801*******</a>
                </div>
                <div className="w-full md:w-1/3 text-center mb-8">
                    <p className="text-lg text-gray-700 font-semibold">
                        Visit Us
                    </p>
                    <p className="text-gray-600">
                        Mymensingh Engineering College
                    </p>
                </div>
            </div>
        </div>

    )
}

export default ContactUs
