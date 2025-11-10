

import React, { useState } from "react";

export const DashboardPage =()=> {
  const [message, setMessage] = useState("");

  // 🧩 Ví dụ 1: preventDefault()
  const handleFormSubmit = (e) => {
    // e.preventDefault(); // ⛔ Không cho reload trang
    setMessage("✅ Form đã được submit mà không reload!");
  };

  // 🧩 Ví dụ 2: stopPropagation()
  const handleParentClick = () => {
    alert("📦 Parent div được click!");
  };

  const handleChildClick = (e) => {
    e.stopPropagation(); // ⛔ Ngăn lan truyền sự kiện
    alert("🧱 Child button được click!");
  };

  // 🧩 Ví dụ 3: target vs currentTarget
  const handleClick = (e) => {
    console.log("e.target:", e.target);
    console.log("e.currentTarget:", e.currentTarget);
    setMessage(`🎯 e.target: ${e.target.tagName}, e.currentTarget: ${e.currentTarget.tagName}`);
  };

  // 🧩 Ví dụ 4: persist()
  const handlePersist = (e) => {
    e.persist();
    setTimeout(() => {
      console.log("⏱ Event type vẫn còn:", e.type);
      setMessage("🕒 Event persisted, vẫn dùng được sau 1s!");
    }, 1000);
  };

  return (
    <div className="p-4 space-y-6">
      <h2>🎓 React Event Demo</h2>

      {/* preventDefault */}
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Nhập gì đó..." />
        <button type="submit">Gửi</button>
      </form>

      {/* stopPropagation */}
      <div
        onClick={handleParentClick}
        style={{ border: "2px solid blue", padding: "20px", marginTop: "20px" }}
      >
        <p>Click vào vùng xanh hoặc nút bên trong để xem sự khác biệt:</p>
        <button onClick={handleChildClick}>Nút bên trong (stopPropagation)</button>
      </div>

      {/* target vs currentTarget */}
      <div
        onClick={handleClick}
        style={{
          border: "2px dashed green",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <p>Bấm vào chữ hoặc vùng xanh để xem target/currentTarget trong console</p>
        <strong>Click vào đây nè</strong>
      </div>

      {/* persist */}
      <button onClick={handlePersist}>Kiểm tra e.persist()</button>

      {/* kết quả */}
      {message && <div style={{ marginTop: "20px", color: "purple" }}>{message}</div>}
    </div>
  );
}

export default DashboardPage;