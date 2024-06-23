import { Button } from "./ui/button";

export const RedirectTest = () => {
  const vref =
    "vipps://qr.vipps.no/28/2/01/031/92885006?v=1&m=Kul%20web-app%20Aslak!&a=1000";
  const href =
    "https://qr.vipps.no/28/2/01/031/92885006?v=1&m=Kul%20web-app%20Aslak!&a=1000";

  const handleOpen = (link: string, blank: boolean) => {
    if (blank) {
      window.open(link, "_blank");
      return;
    }
    window.open(link);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p>A links</p>
        <a href={vref}>Redirect Vipps</a>
        <a href={href}>Redirect HTTPS</a>
      </div>

      <div className="flex flex-col gap-2">
        <p>A links, with blank</p>
        <a href={vref} target="_blank">
          Redirect Vipps
        </a>
        <a href={href} target="_blank">
          Redirect HTTPS
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <p>buttons</p>
        <Button onClick={() => handleOpen(vref, false)}>Redirect Vipps</Button>
        <Button onClick={() => handleOpen(href, false)}>Redirect HTTPS</Button>
      </div>

      <div className="flex flex-col gap-2">
        <p>buttons with blank</p>
        <Button onClick={() => handleOpen(vref, true)}>Redirect Vipps</Button>
        <Button onClick={() => handleOpen(href, true)}>Redirect HTTPS</Button>
      </div>
    </div>
  );
};
