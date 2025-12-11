import React from 'react';
import { Phone, Mail} from 'lucide-react';
import { FaFacebook, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';

interface TopBarProps {
    user?: unknown;
}

const TopBar: React.FC<TopBarProps> = () => {
    return (
        <div className="bg-green-700 text-white py-2 text-sm">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                    {/* Contact Information */}
                    <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
                        <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4" />
                            <span>+977-01-4770641 , +977-01-4770733</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>info@youth.org.np</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-primary px-2 py-1.5 rounded-md font-semibold cursor-pointer hover:bg-white hover:text-black transition-colors duration-300 ease-in-out">
              DONATION
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/yinepal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://x.com/tweet4youth"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter size={22} />
              </a>
              <AiFillInstagram size={22} />
              <FaLinkedin size={22} />
              <FaYoutube size={22} />
            </div>
          </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;