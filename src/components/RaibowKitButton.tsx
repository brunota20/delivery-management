import { ConnectButton } from "@rainbow-me/rainbowkit";

export const RainbowKitButton = () => {
  return (
    <div className="relative z-40">
      <ConnectButton 
      accountStatus={{
        smallScreen: 'avatar',
        largeScreen: 'full',
      }}/>
    </div>
  );
};