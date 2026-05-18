import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/About";
import CustomCursor from "./components/CustomCursor";
import SeoPackages from "./pages/SeoPackages";
import SmoPackages from "./pages/SmoPackages";
import WebPackages from "./pages/WebPackages";
import ContactUs from "./pages/ContactUs";
import Testimonials from "./pages/Testimonials";
import CountryPage from "./pages/CountryPage";
import ServiceItem from "./pages/ServiceItem";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About"; // About Page
import Services from "./pages/Services"; // Services Page
import MM79 from "./pages/MM79";
import AeoGeo from "./pages/AeoGeo";
import SeoAiVisibility from "./pages/SeoAiVisibility";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
// import IndustryItem from "./pages/IndustryItem"
import ChatBot from "./components/chatbot/ChatBot"

function App() {
  return (
    <Router>
      
      <ScrollToTop></ScrollToTop>
      <ChatBot></ChatBot>
      <CustomCursor />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/pricing/seo-powere-by-ai" element={<SeoPackages />} />
        <Route path="/pricing/smo" element={<SmoPackages />} />
        <Route path="/pricing/web" element={<WebPackages />} />
        <Route path="/pricing/aeo+geo" element={<AeoGeo />} />
        <Route
          path="/pricing/seo+ai_visibility"
          element={<SeoAiVisibility />}
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/mm79" element={<MM79 />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        <Route path="/:city" element={<CountryPage />} />
        <Route path="/services/:slug" element={<ServiceItem />} />
        {/* <Route path="/industry/:slug" element={<IndustryItem />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
