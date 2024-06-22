import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const Vipps = () => {
  return (
    <div>
      <h1>Lag din egen vipps-lenke</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="phone">Ditt telefonnummer</Label>
        <Input type="tel" id="phone" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="amount">Hvor mange kroner?</Label>
        <Input type="number" id="amount" min={0} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="message">Melding?</Label>
        <Input type="number" id="message" min={0} />
      </div>
    </div>
  );
};
