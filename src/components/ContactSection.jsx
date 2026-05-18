import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Handshake,
  Building2,
  User,
  Briefcase,
  Sparkles,
  Send,
  ChevronRight,
  Upload,
  FileText,
  X,
  Zap,
  Globe,
  Shield,
} from "lucide-react";

/* ─── Floating Particle ─── */
const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: 4,
      height: 4,
      background: "rgba(103,232,249,0.6)",
      ...style,
    }}
    animate={{ y: [0, -120, 0], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
    transition={{
      duration: style.duration ?? 4,
      repeat: Infinity,
      delay: style.delay ?? 0,
      ease: "easeInOut",
    }}
  />
);

const particles = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: (i * 0.37) % 4,
  duration: 3 + (i % 3),
}));

/* ─── Animated underline input wrapper ─── */
const FieldWrap = ({ children, focused, className = "" }) => (
  <motion.div
    className={`relative ${className}`}
    animate={
      focused
        ? { scale: 1.015, filter: "drop-shadow(0 0 12px rgba(17,138,178,0.4))" }
        : { scale: 1, filter: "none" }
    }
    transition={{ type: "spring", stiffness: 300, damping: 22 }}
  >
    {children}
    <motion.div
      className="absolute bottom-0 left-0 h-0.5 rounded-full"
      style={{ background: "linear-gradient(90deg,#118ab2,#67e8f9)" }}
      animate={{ width: focused ? "100%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    />
  </motion.div>
);

const inputStyle = {
  background: "rgba(0,23,31,0.65)",
  border: "1.5px solid rgba(255,255,255,0.5)",
  color: "#e0f2fe",
  backdropFilter: "blur(12px)",
  outline: "none",
};

const selectStyle = { ...inputStyle };

/* ─── Resume Upload Field ─── */
const ResumeUpload = ({ file, setFile }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (
      f &&
      (f.type === "application/pdf" ||
        f.name.endsWith(".doc") ||
        f.name.endsWith(".docx"))
    ) {
      setFile(f);
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, []);

  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = () => setDragging(false);

  return (
    <motion.div className="col-span-2" layout>
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => inputRef.current.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className="relative cursor-pointer rounded-xl overflow-hidden"
            style={{
              border: `2px dashed ${dragging ? "rgba(103,232,249,0.8)" : "rgba(17,138,178,0.35)"}`,
              background: dragging
                ? "rgba(17,138,178,0.12)"
                : "rgba(0,23,31,0.5)",
              backdropFilter: "blur(12px)",
              transition: "all 0.3s",
            }}
            whileHover={{
              borderColor: "rgba(103,232,249,0.6)",
              background: "rgba(17,138,178,0.08)",
            }}
          >
            {/* scanning line */}
            <motion.div
              className="absolute left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,#67e8f9,transparent)",
              }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />

            <div className="flex flex-col items-center justify-center py-7 gap-3">
              <motion.div
                animate={
                  dragging
                    ? { scale: 1.25, rotate: [0, -8, 8, 0] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.4 }}
                className="p-4 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(0,56,99,0.7),rgba(17,138,178,0.5))",
                  border: "1px solid rgba(17,138,178,0.35)",
                }}
              >
                <Upload size={22} style={{ color: "#67e8f9" }} />
              </motion.div>

              <div className="text-center">
                <p
                  className="font-semibold text-sm"
                  style={{ color: "#e0f2fe" }}
                >
                  {dragging ? "Drop it here!" : "Upload Resume / CV"}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "rgba(148,163,184,0.8)" }}
                >
                  Drag & drop or click · PDF, DOC, DOCX
                </p>
              </div>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="flex items-center gap-4 px-5 py-4 rounded-xl"
            style={{
              background: "rgba(17,138,178,0.12)",
              border: "1.5px solid rgba(103,232,249,0.4)",
              backdropFilter: "blur(12px)",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2.5 rounded-xl shrink-0"
              style={{
                background:
                  "linear-gradient(135deg,rgba(0,56,99,0.8),rgba(17,138,178,0.6))",
              }}
            >
              <FileText size={20} style={{ color: "#67e8f9" }} />
            </motion.div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-semibold truncate"
                style={{ color: "#e0f2fe" }}
              >
                {file.name}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "rgba(103,232,249,0.8)" }}
              >
                {(file.size / 1024).toFixed(1)} KB · Ready to upload
              </p>
              {/* progress bar */}
              <motion.div
                className="mt-2 h-1 rounded-full overflow-hidden"
                style={{ background: "rgba(17,138,178,0.2)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg,#118ab2,#67e8f9)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            </div>
            <motion.button
              onClick={() => setFile(null)}
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg shrink-0"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
              }}
            >
              <X size={14} style={{ color: "#f87171" }} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Submit Button ─── */
const SubmitBtn = ({ label }) => (
  <motion.button
    type="submit"
    className="w-full relative overflow-hidden rounded-xl"
    whileHover={{ scale: 1.025 }}
    whileTap={{ scale: 0.97 }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(135deg,#003863,#118ab2,#00509d,#0284c7)",
        backgroundSize: "300% 300%",
      }}
      animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* shimmer */}
    <motion.div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)",
      }}
      initial={{ x: "-100%" }}
      animate={{ x: "200%" }}
      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8 }}
    />
    <div className="relative px-6 py-4 flex items-center justify-center gap-3 text-white font-semibold tracking-wide">
      <span>{label}</span>
      <motion.span
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        <Send size={17} />
      </motion.span>
    </div>
  </motion.button>
);

/* ─── Business Form ─── */
const BusinessForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    businessEmail: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
const initialFormState = {
  companyName: "",
  businessEmail: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
};

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  setLoading(true);

  try {
    await emailjs.send(
      "service_8oqd2qb",
      "template_s22ivva",
      {
        formType: "Business Inquiry",
        title: "Business Inquiry",
        companyName: formData.companyName,
        businessEmail: formData.businessEmail,
        phone: formData.phone,
        projectType: formData.projectType,
        budget: formData.budget,
        message: formData.message,

        fullName: "-",
        email: "-",
        position: "-",
        experience: "-",
        portfolio: "-",
      },
      "daTfRauE6dCIypmMo"
    );

    setSubmitted(true);

    // reset fields
    setFormData(initialFormState);

    setTimeout(() => {
      setSubmitted(false);
    }, 3500);
  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};
  const fi = (name) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
  });

  const sharedInput =
    "w-full py-3.5 rounded-xl text-sm transition-all duration-300";

  return (
    <motion.form
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Company */}
        <FieldWrap focused={focused === "companyName"} className="col-span-2">
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#118ab2" }}
          >
            <Building2 size={17} />
          </div>
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            required 
            value={formData.companyName}
            onChange={handleChange}
            {...fi("companyName")}
            className={`${sharedInput} pl-11 pr-4`}
            style={inputStyle}
          />
        </FieldWrap>

        {/* Email */}
        <FieldWrap focused={focused === "businessEmail"}>
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#118ab2" }}
          >
            <Mail size={17} />
          </div>
          <input
            type="email"
            name="businessEmail"
            placeholder="Business Email"
            value={formData.businessEmail}
            onChange={handleChange}
            {...fi("businessEmail")}
            className={`${sharedInput} pl-11 pr-4`}
            style={inputStyle}
            required 
          />
        </FieldWrap>

        {/* Phone */}
        <FieldWrap focused={focused === "phone"}>
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#118ab2" }}
          >
            <Phone size={17} />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            {...fi("phone")}
            className={`${sharedInput} pl-11 pr-4`}
            style={inputStyle}
            required 
          />
        </FieldWrap>

        {/* Project Type */}
        <FieldWrap focused={focused === "projectType"} required  className="col-span-2">
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#118ab2" }}
          >
            <Briefcase size={17} />
          </div>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            {...fi("projectType")}
            className={`${sharedInput} pl-11 pr-10 appearance-none cursor-pointer`}
            style={selectStyle}
          >
            <option value="" style={{ background: "#00171f" }}>
              Select Project Type
            </option>
            <option value="web" style={{ background: "#00171f" }}>
              Web Development
            </option>
            <option value="mobile" style={{ background: "#00171f" }}>
              Seo Powered By AI
            </option>
            <option value="ai" style={{ background: "#00171f" }}>
              SMO
            </option>
            <option value="consulting" style={{ background: "#00171f" }}>
              AEO + GEO
            </option>
          </select>
          <ChevronRight
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none"
            style={{ color: "#118ab2" }}
          />
        </FieldWrap>

        {/* Budget */}
        <FieldWrap focused={focused === "budget"}  required  className="col-span-2">
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            {...fi("budget")}
            className={`${sharedInput} px-4 pr-10 appearance-none cursor-pointer`}
            style={selectStyle}
          >
            <option value="" style={{ background: "#00171f" }}>
              Budget Range
            </option>
            <option value="5k-10k" style={{ background: "#00171f" }}>
              $5k – $10k
            </option>
            <option value="10k-25k" style={{ background: "#00171f" }}>
              $10k – $25k
            </option>
            <option value="25k-50k" style={{ background: "#00171f" }}>
              $25k – $50k
            </option>
            <option value="50k+" style={{ background: "#00171f" }}>
              $50k+
            </option>
          </select>
          <ChevronRight
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none"
            style={{ color: "#118ab2" }}
          />
        </FieldWrap>

        {/* Message */}
        <FieldWrap focused={focused === "message"} className="col-span-2">
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            {...fi("message")}
            rows="3"
            className="w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300 resize-none"
            style={inputStyle}
          />
        </FieldWrap>
      </div>

<SubmitBtn
  label={loading ? "Sending..." : "Send Business Inquiry"}
/>
      <AnimatePresence>
  {submitted && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 40 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative w-full max-w-md rounded-3xl p-8 text-center overflow-hidden"
        style={{
          background: "rgba(0,17,26,0.95)",
          border: "1px solid rgba(103,232,249,0.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(17,138,178,0.25), rgba(103,232,249,0.15))",
          }}
        >
          <Handshake size={42} style={{ color: "#67e8f9" }} />
        </motion.div>

        <h3
          className="text-2xl font-bold mb-3"
          style={{ color: "#e0f2fe" }}
        >
          Thank You!
        </h3>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(226,232,240,0.85)" }}
        >
          Thank you for contacting us. We’ve received your inquiry and our team
          will get back to you shortly.
        </p>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.form>
  );
};

/* ─── Career Form ─── */
const CareerForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    portfolio: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

const initialCareerState = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  experience: "",
  portfolio: "",
  message: "",
};

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  setLoading(true);

  try {
    await emailjs.send(
      "service_8oqd2qb",
      "template_s22ivva",
      {
        formType: "Career Application",
        title: "Career Application",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        experience: formData.experience,
        portfolio: formData.portfolio,
        message: formData.message,

        companyName: "-",
        businessEmail: "-",
        projectType: "-",
        budget: "-",
      },
      "daTfRauE6dCIypmMo"
    );

    setSubmitted(true);

    setFormData(initialCareerState);

    setResumeFile(null);

    setTimeout(() => {
      setSubmitted(false);
    }, 3500);
  } catch (err) {
    console.error(err);
    alert("Failed");
  } finally {
    setLoading(false);
  }
};

  const fi = (name) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
  });
  const sharedInput =
    "w-full py-3.5 rounded-xl text-sm transition-all duration-300";

  return (
    <motion.form
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Full Name */}
        <FieldWrap focused={focused === "fullName"} className="col-span-2">
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#118ab2" }}
          >
            <User size={17} />
          </div>
          <input
          required 
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            {...fi("fullName")}
            className={`${sharedInput} pl-11 pr-4`}
            style={inputStyle}
          />
        </FieldWrap>

        {/* Email */}
        <FieldWrap focused={focused === "email"} required  >
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#118ab2" }}
          >
            <Mail size={17} />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            {...fi("email")}
            className={`${sharedInput} pl-11 pr-4`}
            style={inputStyle}
            required 
          />
        </FieldWrap>

        {/* Phone */}
        <FieldWrap focused={focused === "phone"}>
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#118ab2" }}
          >
            <Phone size={17} />
          </div>
          <input
          required 
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            {...fi("phone")}
            className={`${sharedInput} pl-11 pr-4`}
            style={inputStyle}
          />
        </FieldWrap>

        {/* Position */}
        <FieldWrap focused={focused === "position"} className="col-span-2">
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#118ab2" }}
          >
            <Briefcase size={17} />
          </div>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            {...fi("position")}
            className={`${sharedInput} pl-11 pr-10 appearance-none cursor-pointer`}
            style={selectStyle}
            required 
          >
            <option value="" style={{ background: "#00171f" }}>
              Position You're Applying For
            </option>
            <option value="frontend" style={{ background: "#00171f" }}>
             Business Development Manager
            </option>
            <option value="backend" style={{ background: "#00171f" }}>
              Business Development Executive
            </option>
            <option value="fullstack" style={{ background: "#00171f" }}>
              Project Manager
            </option>
            <option value="designer" style={{ background: "#00171f" }}>
              HR
            </option>
            <option value="pm" style={{ background: "#00171f" }}>
              SEO Executive
            </option>
            <option value="pm" style={{ background: "#00171f" }}>
              Content Writer
            </option>
            <option value="pm" style={{ background: "#00171f" }}>
              Developer
            </option>
          </select>
          <ChevronRight
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none"
            style={{ color: "#118ab2" }}
          />
        </FieldWrap>

        {/* Experience */}
        <FieldWrap focused={focused === "experience"}>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            {...fi("experience")}
            className={`${sharedInput} px-4 pr-10 appearance-none cursor-pointer`}
            style={selectStyle}
            required 
          >
            <option value="" style={{ background: "#00171f" }}>
              Experience
            </option>
            <option value="0-2" style={{ background: "#00171f" }}>
              0–2 Years
            </option>
            <option value="3-5" style={{ background: "#00171f" }}>
              3–5 Years
            </option>
            <option value="5-8" style={{ background: "#00171f" }}>
              5–8 Years
            </option>
            <option value="8+" style={{ background: "#00171f" }}>
              8+ Years
            </option>
          </select>
          <ChevronRight
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none"
            style={{ color: "#118ab2" }}
          />
        </FieldWrap>

        {/* Portfolio */}
        <FieldWrap focused={focused === "portfolio"}>
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#118ab2" }}
          >
            <Globe size={17} />
          </div>
          <input
            type="url"
            name="portfolio"
            placeholder="Portfolio / GitHub"
            value={formData.portfolio}
            onChange={handleChange}
            {...fi("portfolio")}
            className={`${sharedInput} pl-11 pr-4`}
            style={inputStyle}
          />
        </FieldWrap>

        {/* Resume Upload */}
        <ResumeUpload file={resumeFile} setFile={setResumeFile} />

        {/* Cover Letter */}
        <FieldWrap focused={focused === "message"} className="col-span-2">
          <textarea
            name="message"
            placeholder="Why do you want to join us? (Optional)"
            value={formData.message}
            onChange={handleChange}
            {...fi("message")}
            rows="3"
            className="w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300 resize-none"
            style={inputStyle}
          />
        </FieldWrap>
      </div>

<SubmitBtn
  label={loading ? "Submitting..." : "Submit Application"}
/>
      <AnimatePresence>
  {submitted && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 40 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative w-full max-w-md rounded-3xl p-8 text-center overflow-hidden"
        style={{
          background: "rgba(0,17,26,0.95)",
          border: "1px solid rgba(103,232,249,0.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mx-auto mb-5 flex items-center justify-center w-20 h-20 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(17,138,178,0.25), rgba(103,232,249,0.15))",
          }}
        >
          <Handshake size={42} style={{ color: "#67e8f9" }} />
        </motion.div>

        <h3
          className="text-2xl font-bold mb-3"
          style={{ color: "#e0f2fe" }}
        >
          Application Submitted!
        </h3>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(226,232,240,0.85)" }}
        >
          Thank you for applying. Our team will review your application and
          connect with you soon.
        </p>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.form>
  );
};

/* ─── Tab Switcher ─── */
const FormSwitcher = ({ activeForm, setActiveForm }) => (
  <motion.div
    className="relative flex rounded-2xl p-1.5"
    style={{
      background: "rgba(0,23,31,0.75)",
      border: "1px solid rgba(17,138,178,0.28)",
      backdropFilter: "blur(16px)",
    }}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.15 }}
  >
    {/* Slider */}
    <motion.div
      className="absolute top-1.5 bottom-1.5 rounded-xl"
      style={{
        background: "linear-gradient(135deg,#003863,#118ab2)",
        boxShadow: "0 4px 20px rgba(17,138,178,0.55)",
      }}
      animate={{
        left: activeForm === "business" ? "0.375rem" : "50%",
        right: activeForm === "business" ? "50%" : "0.375rem",
      }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
    />
    {[
      { id: "business", Icon: Building2, label: "Business" },
      { id: "career", Icon: User, label: "Career" },
    ].map(({ id, Icon, label }) => (
      <motion.button
        key={id}
        className={`relative flex-1 px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-300 ${
          activeForm === id
            ? "text-white"
            : "text-slate-400 hover:text-slate-200"
        }`}
        onClick={() => setActiveForm(id)}
        whileTap={{ scale: 0.97 }}
      >
        <Icon size={17} />
        <span>{label}</span>
        {activeForm === id && (
          <motion.span
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles size={14} style={{ color: "#67e8f9" }} />
          </motion.span>
        )}
      </motion.button>
    ))}
  </motion.div>
);

/* ─── Main Contact Section ─── */
export default function ContactSection() {
  const [activeForm, setActiveForm] = useState("business");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const contactInfo = [
    {
      icon: <Phone size={18} />,
      title: "Call Us",
      content: "+91 1204537874",
      sub: "Mon–Fri 10am–7pm EST",
          href: "tel:+911204537874",
          target:"_self"

    },
    {
      icon: <Mail size={18} />,
      title: "Email Us",
      content: "contactus@makeolix.com",
      sub: "Reply within 24 hrs",
          href: "mailto:contactus@makeolix.com",
          target: "_self"

    },
    {
      icon: <MapPin size={18} />,
      title: "Visit Us",
      content: "Suite G-02, H-143, H Block, Sector 63, Noida, Uttar Pradesh 201301",
      sub: "India , Uttar Pradesh",
      href:"https://www.google.com/maps/dir//MakeOlix+Consulting,+Suite+G-02,+H-143,+H+Block,+Sector+63,+Noida,+Uttar+Pradesh+201301,+India/@45.580661,-122.3743919,7z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390ce507e86da249:0x5e0e183bceff14c!2m2!1d77.378339!2d28.625822?entry=ttu&g_ep=EgoyMDI2MDQyNi4wIKXMDSoASAFQAw%3D%3D",
      target: "_blank",
    },
  ];

  const stats = [
    { icon: <Zap size={16} />, value: "<2h", label: "Response Time" },
    { icon: <Shield size={16} />, value: "100%", label: "Satisfaction" },
    { icon: <Globe size={16} />, value: "24/7", label: "Support" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "var(--bg-main, #00111a)" }}
    >
      {/* Background grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,86,149,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,86,149,0.04) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "44px 44px"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 25%, rgba(17,138,178,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-24 left-8 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(17,138,178,0.12) 0%, transparent 70%)",
          filter: "blur(45px)",
        }}
        animate={{ scale: [1, 1.25, 1], x: [0, 35, 0], y: [0, -25, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-8 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,80,157,0.1) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 45, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(17,138,178,0.1)",
                border: "1px solid rgba(17,138,178,0.35)",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={15} style={{ color: "#67e8f9" }} />
              </motion.div>
              <span
                className="text-sm font-semibold tracking-widest"
                style={{ color: "#67e8f9" }}
              >
                GET IN TOUCH
              </span>
            </motion.div>

            {/* Heading */}
            <h2 className=" leading-tight mb-5">
              <span style={{ color: "#fff" }}>Let's Build </span>
              <motion.span
                style={{
                  background: "#fff",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% 200%",
                  display: "inline-block",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Something Amazing
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="text-base leading-relaxed mb-10"
              style={{ color: "rgba(250,255,250,0.9)" }}
            >
              Whether you have a project in mind or want to join our team, we're
              here to help. Choose your path below and let's start the
              conversation.
            </motion.p>

            {/* ── Contact Cards: horizontal 3-in-a-row ── */}
            <motion.div
              className="grid grid-cols-3 gap-3 mb-10"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {contactInfo.map((info, i) => (
                <motion.a
                 href={info.href}
                  target={info.target}
                  key={i}
                  className="flex flex-col items-center text-center p-4 rounded-2xl cursor-pointer group"
                  style={{
                    background: "rgba(0,23,31,0.45)",
                    border: "1px solid rgba(17,138,178,0.18)",
                    backdropFilter: "blur(12px)",
                  }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(103,232,249,0.45)",
                    boxShadow: "0 12px 35px rgba(17,138,178,0.2)",
                    y: -4,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.4 + i * 0.1 }}
                >
                  {/* Pulsing ring on hover */}
                  <motion.div
                    className="relative mb-3 p-3 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(0,56,99,0.65),rgba(17,138,178,0.45))",
                      border: "1px solid rgba(17,138,178,0.35)",
                    }}
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div style={{ color: "#67e8f9" }}>{info.icon}</div>
                    {/* pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ border: "1px solid rgba(103,232,249,0.5)" }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  </motion.div>
                  <h3
                    className=" mb-1"
                    style={{ color: "#e0f2fe" }}
                  >
                    {info.title}
                  </h3>
                  <p
                    className="text-xs leading-snug mb-0.5"
                    style={{ color: "rgba(148,163,184,0.8)" }}
                  >
                    {info.content}
                  </p>
                  <p className="text-[10px]" style={{ color: "#67e8f9" }}>
                    {info.sub}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    <ArrowRight size={13} style={{ color: "#67e8f9" }} />
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65, duration: 0.55 }}
            >
              {stats.map(({ icon, value, label }, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2.5"
                  whileHover={{ scale: 1.06 }}
                >
                  <motion.div
                    className="p-2 rounded-lg"
                    style={{
                      background: "rgba(17,138,178,0.18)",
                      border: "1px solid rgba(17,138,178,0.3)",
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(103,232,249,0)",
                        "0 0 12px rgba(103,232,249,0.4)",
                        "0 0 0px rgba(103,232,249,0)",
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    <div style={{ color: "#67e8f9" }}>{icon}</div>
                  </motion.div>
                  <div>
                    <div
                      className="text-xl font-bold leading-none"
                      style={{ color: "#67e8f9" }}
                    >
                      {value}
                    </div>
                    <div
                      className="text-[11px] mt-0.5"
                      style={{ color: "rgba(148,163,184,0.75)" }}
                    >
                      {label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN – FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="relative"
          >
            {/* Decorative glow blob */}
            <motion.div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(135deg,#118ab2,#00509d)",
                filter: "blur(22px)",
                opacity: 0.35,
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(135deg,#67e8f9,#118ab2)",
                filter: "blur(20px)",
                opacity: 0.25,
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.4, 0.25] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Form Card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "rgba(0,17,26,0.6)",
                border: "1px solid rgba(17,138,178,0.22)",
                backdropFilter: "blur(22px)",
                boxShadow: "0 30px 60px -16px rgba(0,0,0,0.6)",
              }}
            >
              {/* Animated gradient border sweep */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg,transparent 0%,rgba(17,138,178,0.12) 50%,transparent 100%)",
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Corner accent lines */}
              <div
                className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
                style={{
                  borderTop: "2px solid rgba(103,232,249,0.4)",
                  borderLeft: "2px solid rgba(103,232,249,0.4)",
                  borderRadius: "1.5rem 0 0 0",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
                style={{
                  borderBottom: "2px solid rgba(103,232,249,0.25)",
                  borderRight: "2px solid rgba(103,232,249,0.25)",
                  borderRadius: "0 0 1.5rem 0",
                }}
              />

              <div className="relative p-7">
                {/* Tab Switcher */}
                <div className="mb-7">
                  <FormSwitcher
                    activeForm={activeForm}
                    setActiveForm={setActiveForm}
                  />
                </div>

                {/* Active Form */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {activeForm === "business" ? (
                      <BusinessForm key="business" />
                    ) : (
                      <CareerForm key="career" />
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-5 text-center text-xs"
                  style={{ color: "rgba(100,116,139,0.8)" }}
                >
                  By submitting, you agree to our{" "}
                  <a
                    href="#"
                    style={{ color: "#67e8f9" }}
                    className="hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    style={{ color: "#67e8f9" }}
                    className="hover:underline"
                  >
                    Terms of Service
                  </a>
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
