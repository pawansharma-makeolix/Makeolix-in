import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Button from "../components/Button";

const CONTACT_URL = "/contact";

const ShaderCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    const vertSrc = `attribute vec2 aPos; void main(){ gl_Position=vec4(aPos,0.,1.); }`;
    const fragSrc = `
      precision highp float;
      uniform float iTime; uniform vec2 iRes;
      mat2 rot(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
      float wave(vec2 v1,vec2 v2,float str,float spd){ return sin(dot(normalize(v1),normalize(v2))*str+iTime*spd)/100.0; }
      vec3 ring(vec2 uv,vec2 cen,float r,float w){
        vec2 d=cen-uv; float l=length(d);
        l+=wave(d,vec2(0.,1.),5.,2.); l-=wave(d,vec2(1.,0.),5.,2.);
        float c=smoothstep(r-w,r,l)-smoothstep(r,r+w,l);
        return vec3(c);
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/iRes; uv.x*=1.5; uv.x-=0.25;
        vec2 cen=vec2(.5); float mask=0.;
        mask+=ring(uv,cen,.35,.032).r;
        mask+=ring(uv,cen,.332,.009).r;
        mask+=ring(uv,cen,.368,.004).r;
        vec2 v=rot(iTime)*uv;
        vec3 fg=vec3(0.0+v.x*0.2, 0.22+v.y*0.31, 0.45+v.x*0.3);
        vec3 bg=vec3(0.0,0.09,0.122);
        vec3 color=mix(bg,fg,mask);
        color=mix(color,vec3(0.07,0.53,0.7),ring(uv,cen,.35,.002).r);
        gl_FragColor=vec4(color,1.);
      }`;
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const iT = gl.getUniformLocation(prog, "iTime");
    const iR = gl.getUniformLocation(prog, "iRes");
    let raf;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    resize();
    window.addEventListener("resize", resize);
    const render = (t) => {
      gl.uniform1f(iT, t * 0.001);
      gl.uniform2f(iR, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
};

const TickIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const CrossIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const FeatureRow = ({ label, included, index }) => (
  <motion.li
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.015, duration: 0.25 }}
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
      fontSize: "12px",
      lineHeight: 1.55,
      padding: "2.5px 0",
      color:
        included === false
          ? "rgba(255,255,255,0.22)"
          : included === "conditional"
            ? "rgba(255,255,255,0.48)"
            : "rgba(255,255,255,0.84)",
    }}
  >
    <span
      style={{
        marginTop: "2px",
        flexShrink: 0,
        color:
          included === false
            ? "rgba(255,70,70,0.65)"
            : included === "conditional"
              ? "rgba(17,138,178,0.9)"
              : "#22d3a5",
      }}
    >
      {included === false ? <CrossIcon /> : <TickIcon />}
    </span>
    {label}
  </motion.li>
);

const SectionHeader = ({ children }) => (
  <div
    style={{
      fontSize: "9px",
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--blue-3)",
      margin: "16px 0 6px",
      paddingBottom: "5px",
      borderBottom: "1px solid rgba(17,138,178,0.2)",
    }}
  >
    {children}
  </div>
);

const GlowBorder = () => (
  <motion.div
    animate={{ opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    style={{
      position: "absolute",
      inset: -1,
      borderRadius: "23px",
      zIndex: -1,
      background:
        "linear-gradient(135deg, var(--blue-2), var(--blue-3), #22d3a5, var(--blue-2))",
      backgroundSize: "300% 300%",
    }}
  />
);

// ─────────────────────────────────────────────────────────────
// NEW PROPS (dono optional hain, default pehle jaisa hi rahega):
//
//   alwaysExpanded={true}
//     → "View All Features" button hatao, sections seedha
//        bahar dikho (collapsed/expand nahi hoga)
//
//   fullWidth={true}
//     → Single card hone par bhi puri width le
//        (multiple cards ho toh koi fark nahi padta)
// ─────────────────────────────────────────────────────────────
export const PricingCard = ({
  planName,
  currentPrice,
  originalPrice,
  period = "/ month",
  inclusions,
  inclusionsTitle,
  sections,
  isPopular = false,
  badgeText = "Best Seller",
  contactUrl = CONTACT_URL,
  expanded,
  onToggle,
  buttonWidth,
  visibleSections = [],
  alwaysExpanded = false, // NEW — default: false (pehle jaisa)
}) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-40px" });

  const savePct = originalPrice
    ? Math.round(
        (1 -
          parseFloat(currentPrice.replace("$", "")) /
            parseFloat(originalPrice.replace("$", ""))) *
          100,
      )
    : null;

  const handleGetStarted = () => {
    if (contactUrl.startsWith("mailto:") || contactUrl.startsWith("http")) {
      window.open(contactUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = contactUrl;
    }
  };

  // alwaysExpanded=true ho to: sections seedha dikho, button nahi
  const showToggleButton = !alwaysExpanded && sections && sections.length > 0;
  const sectionsVisible = alwaysExpanded || expanded;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 55 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -9, transition: { duration: 0.22, ease: "easeOut" } }}
      transition={{ duration: 0.55, type: "spring", stiffness: 80 }}
      style={{
        position: "relative",
        background: isPopular
          ? "linear-gradient(150deg, rgba(0,56,99,0.72) 0%, rgba(0,80,157,0.42) 50%, rgba(0,23,31,0.68) 100%)"
          : "linear-gradient(150deg, rgba(5,25,35,0.84) 0%, rgba(0,23,31,0.72) 100%)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        border: isPopular
          ? "1.5px solid rgba(17,138,178,0.65)"
          : "1px solid rgba(17,138,178,0.16)",
        borderRadius: "22px",
        width: "100%",
        maxWidth: "450px",
        display: "flex",
        flexDirection: "column",
        boxShadow: isPopular
          ? "0 0 55px rgba(17,138,178,0.25), 0 24px 70px rgba(0,0,0,0.58)"
          : "0 8px 36px rgba(0,0,0,0.42)",
        overflow: "hidden",
        transform: isPopular ? "scale(1.035)" : "scale(1)",
      }}
    >
      {isPopular && <GlowBorder />}

      <motion.div
        animate={
          isPopular
            ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
            : {}
        }
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        style={{
          height: isPopular ? "3px" : "1px",
          background: isPopular
            ? "linear-gradient(90deg, var(--blue-1), var(--blue-3), #22d3a5, var(--blue-2), var(--blue-1))"
            : "rgba(17,138,178,0.22)",
          backgroundSize: "300% 100%",
          flexShrink: 0,
        }}
      />

      {isPopular && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
          style={{
            background:
              "linear-gradient(90deg, var(--blue-1), var(--blue-2), var(--blue-3))",
            textAlign: "center",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            color: "#fff",
            padding: "6px 0",
            textTransform: "uppercase",
          }}
        >
          ★ {badgeText}
        </motion.div>
      )}

      {isPopular &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [-4, -18, -4],
              opacity: [0, 0.6, 0],
              x: [0, i % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{
              duration: 2.8 + i * 0.35,
              repeat: Infinity,
              delay: i * 0.45,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: `${18 + i * 11}%`,
              right: i % 2 === 0 ? "10px" : "auto",
              left: i % 2 !== 0 ? "10px" : "auto",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "var(--blue-3)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        ))}

      <div style={{ padding: "20px 22px 0" }}>
        {visibleSections.length > 0 && (
          <div style={{ paddingBottom: "10px" }}>
            {visibleSections.map((sec, si) => (
              <div key={si}>
                <SectionHeader>{sec.title}</SectionHeader>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {sec.items.map((item, ii) => (
                    <FeatureRow
                      key={ii}
                      label={item.label}
                      included={item.included}
                      index={ii}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <motion.h3
          initial={{ opacity: 0, x: -14 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.38 }}
          style={{
            
            color: "#fff",
            marginBottom: "6px",
          }}
        >
          {planName}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.16, duration: 0.36 }}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "8px",
            marginBottom: "4px",
          }}
        >
          <span
            style={{
              fontSize: "29px",
              fontWeight: 800,
              color: "var(--blue-3)",
            }}
          >
            {currentPrice}
          </span>
          {originalPrice && (
            <span
              style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.28)",
                textDecoration: "line-through",
              }}
            >
              {originalPrice}
            </span>
          )}
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
            {period}
          </span>
        </motion.div>

        {savePct && (
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.26, type: "spring", stiffness: 220 }}
            style={{
              display: "inline-block",
              fontSize: "10px",
              fontWeight: 700,
              background: "rgba(34,211,165,0.12)",
              color: "#22d3a5",
              border: "1px solid rgba(34,211,165,0.28)",
              borderRadius: "20px",
              padding: "2px 9px",
              marginBottom: "12px",
              letterSpacing: "0.07em",
            }}
          >
            SAVE {savePct}%
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="mb-2 "
          style={{
            width: buttonWidth === "full" ? "100%" : buttonWidth,
          }}
        >
          <Button
            onClick={handleGetStarted}
            variant="outline"
            href={"/contact-us"}
          >
            Buy Now
          </Button>
        </motion.div>

        {inclusions && inclusions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.38 }}
            style={{
              background: "rgba(17,138,178,0.09)",
              borderRadius: "12px",
              padding: "12px 14px",
              marginBottom: "6px",
              border: "1px solid rgba(17,138,178,0.16)",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                color: "var(--blue-3)",
                letterSpacing: "0.13em",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              {inclusionsTitle || "Inclusions"}
            </div>
            {inclusions.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "12px",
                  color:
                    item.included === false
                      ? "rgba(255,255,255,0.22)"
                      : "rgba(255,255,255,0.84)",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    color:
                      item.included === false
                        ? "rgba(255,70,70,0.65)"
                        : "#22d3a5",
                  }}
                >
                  {item.included === false ? <CrossIcon /> : <TickIcon />}
                </span>
                {item.label}
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div style={{ padding: "0 22px" }}>
        {/* Toggle button — sirf tab dikhe jab alwaysExpanded=false ho */}
        {showToggleButton && (
          <motion.button
            whileHover={{ color: "#fff" }}
            onClick={onToggle}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              color: "var(--blue-3)",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: 600,
              padding: "10px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              letterSpacing: "0.07em",
            }}
          >
            {expanded ? "Hide" : "View All"} Features
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.22 }}
            >
              ▼
            </motion.span>
          </motion.button>
        )}

        {/* alwaysExpanded=true → seedha sections dikho bina animation ke */}
        {alwaysExpanded && sections && sections.length > 0 && (
          <div style={{ paddingBottom: "16px" }}>
            {sections.map((sec, si) => (
              <div key={si}>
                <SectionHeader>{sec.title}</SectionHeader>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {sec.items.map((item, ii) => (
                    <FeatureRow
                      key={ii}
                      label={item.label}
                      included={item.included}
                      index={ii}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Normal toggle behavior — sirf tab jab alwaysExpanded=false */}
        {!alwaysExpanded && (
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="feats"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                {sections.map((sec, si) => (
                  <div key={si}>
                    <SectionHeader>{sec.title}</SectionHeader>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {sec.items.map((item, ii) => (
                        <FeatureRow
                          key={ii}
                          label={item.label}
                          included={item.included}
                          index={ii}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};


export const PricingSection = ({
  plans,
  subtitle,
  showBg = true,
  contactUrl,
  fullWidth = false, // NEW
  alwaysExpanded = false, // NEW — sab cards pe apply hoga
}) => {
  const [allExpanded, setAllExpanded] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "var(--bg-main)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {showBg && <ShaderCanvas />}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse at 50% 18%, rgba(0,56,99,0.2) 0%, rgba(0,23,31,0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      <main
        style={{ position: "relative", zIndex: 2, padding: "60px 20px 80px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.55 }}
            style={{
              width: "50px",
              height: "3px",
              background: "linear-gradient(90deg,var(--blue-2),var(--blue-3))",
              margin: "0 auto 18px",
              borderRadius: "2px",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.4 }}
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "16px",
              flexWrap: "wrap",
            }}
          >
            {[
              { color: "#22d3a5", icon: "✓", label: "Included" },
              {
                color: "rgba(255,70,70,0.8)",
                icon: "✗",
                label: "Not Included",
              },
              {
                color: "rgba(17,138,178,0.95)",
                icon: "✓",
                label: "Conditional / Client Dependent",
              },
            ].map(({ color, icon, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.46)",
                }}
              >
                <span style={{ color, fontWeight: 700 }}>{icon}</span> {label}
              </div>
            ))}
          </motion.div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "22px",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "1380px",
            margin: "0 auto",
          }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.planName}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1 + 0.18,
                duration: 0.5,
                type: "spring",
                stiffness: 78,
              }}
              style={
                fullWidth
                  ? {
                      // fullWidth=true → puri width lo, maxWidth hatao
                      flex: "1 1 100%",
                      maxWidth: "100%",
                    }
                  : {
                      // Default → pehle jaisa
                      flex: "1 1 260px",
                      maxWidth: "450px",
                    }
              }
            >
              <PricingCard
                {...plan}
                contactUrl={contactUrl}
                expanded={allExpanded}
                onToggle={() => setAllExpanded(!allExpanded)}
                alwaysExpanded={alwaysExpanded}
                // fullWidth card ke andar bhi maxWidth hata do
                {...(fullWidth ? { style: { maxWidth: "100%" } } : {})}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PricingSection;
