import { lusitana } from '@/app/ui/fonts';
import Logo from '@/public/Seal_W_large.png'
import Image from 'next/image'

export default function OBCLogo() {
  return (
    <div className={`${lusitana.className} flex justify-center items-center w-full h-full`}>
      <Image src={Logo} alt="OBC logo" width={100} height={100} className="object-contain"/>
    </div>
  );
}