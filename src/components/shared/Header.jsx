import { Plus, Plane, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  
  const navigate = useNavigate();

  return (
    <header className="bg-black/30 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between w-full absolute top-0 left-0 z-50">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div className="bg-gray-700 p-2 rounded-xl shadow-xl border border-gray-400">
        
          <Plane className="w-6 h-6 text-white" />
        </div>

        <h2 className="font-bold text-3xl text-white">
          TripNest
        </h2>
      </Link>

      {/* Right Buttons */}
      <div className="flex items-center gap-4">

        <Button
          variant="outline"
          className="flex items-center gap-2 px-6 py-5 border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white"
          onClick={() => navigate("/create-trip")}
        >
          <Plus className="w-5 h-5" />
          Create Trip
        </Button>

        <Button
          className="flex items-center gap-2 px-6 py-5 text-white bg-white/20 hover:bg-white/30 backdrop-blur-md shadow-xl border border-white/20"
          
        >

          <User className="w-5 h-5" />
          Login
        </Button>

      </div>
    </header>
  );
};

export default Header;