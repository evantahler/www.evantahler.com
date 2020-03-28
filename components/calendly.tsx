function Calendly() {
  const style = {
    minWidth: 320,
    height: 630,
  };

  return (
    <>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/evantahler/30min"
        style={style}
      />
      <script
        async
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
      />
    </>
  );
}

export default Calendly;
