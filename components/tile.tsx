import React from "react";

interface TileProps {
  header: string;
  tickColor?: string;
  children: React.ReactNode;
}

const Tile: React.FC<TileProps> = ({ header, tickColor = "green", children }) => {
  const tileStyle: React.CSSProperties = {
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: "#1E1E1E",
    width: "95%",
    height: "80%",

  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const tickStyle: React.CSSProperties = {
    color: tickColor,
    fontSize: "20px",
    marginRight: "8px",
  };

  const contentStyle: React.CSSProperties = {
    fontSize: "14px",
    lineHeight: "1.5",
    overflowY: "scroll"

  };

  return (
    <div style={tileStyle}>
      <div style={headerStyle}>
        <span style={tickStyle}>✔</span>
        {header}
      </div>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default Tile;
