import { FaWhatsapp } from "react-icons/fa";

function WhatsappButton() {

  return (

    <a
      href="https://wa.me/919999999999"
      target="_blank"
      className="fixed bottom-6 right-6 z-50"
    >

      <div className="w-16 h-16 rounded-full bg-green-500 hover:scale-110 duration-300 flex items-center justify-center text-white text-4xl shadow-2xl animate-bounce">

        <FaWhatsapp />

      </div>

    </a>
  );
}

export default WhatsappButton;