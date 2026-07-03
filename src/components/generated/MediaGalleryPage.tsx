import * as React from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Play, Calendar, Clock, ChevronRight, ExternalLink, MapPin, ChevronDown, X, ChevronLeft } from 'lucide-react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';

function useWindowWidth() {
  const [width, setWidth] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth : 1280);
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}

// ─── Brand tokens ────────────────────────────────────────────────────────────
const RED = '#FC3637';
const DARK = '#0D0D0D';
const FOOTER_BG = '#0A0A0A';
const WHITE = '#FFFFFF';



// ─── Interfaces ──────────────────────────────────────────────────────────────
interface EventImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  location: string;
  size: 'tall' | 'wide' | 'square' | 'short';
}
interface EventGroup {
  id: string;
  eyebrow: string;
  title: string;
  location: string;
  date: string;
  description: string;
  images: EventImage[];
  platform: string;
}
interface PressArticle {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  featured?: boolean;
  url?: string;
  platform: string;
}
interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  date: string;
  thumbnail: string;
  category: string;
  size: 'large' | 'medium' | 'small';
  youtubeId: string;
  platform: string;
}

// ─── Event Groups ─────────────────────────────────────────────────────────────

const EVENT_GROUPS: EventGroup[] = [];

// ─── Local Image Galleries Datasets ──────────────────────────────────────────

const SPEAKER_FIRM_IMAGES: EventImage[] = [
  "DSC_1608.jpg", "DSC_1614.jpg", "DSC_1618.jpg", "DSC_1619.jpg", "DSC_1624.jpg",
  "DSC_1636.jpg", "DSC_1637.jpg", "DSC_1642.jpg", "DSC_1643.jpg", "DSC_1646.jpg",
  "DSC_1660.jpg", "DSC_1665.jpg", "DSC_1684.jpg", "DSC_1686.jpg", "DSC_1687.jpg",
  "DSC_1690.jpg", "DSC_1692.jpg", "DSC_1702.jpg", "DSC_1704.jpg", "DSC_1709.jpg",
  "DSC_1718.jpg", "DSC_1726.jpg", "DSC_1726_1.jpg", "DSC_1729.jpg", "DSC_1731.jpg",
  "DSC_1733.jpg", "DSC_1735.jpg", "DSC_1736.jpg", "DSC_1737.jpg", "DSC_1741.jpg",
  "DSC_1742.jpg", "DSC_1743.jpg", "DSC_1745.jpg", "DSC_1748.jpg", "DSC_1751.jpg",
  "DSC_1753.jpg", "DSC_1754.jpg"
].map((name, idx) => ({
  id: `sf-${idx}`,
  src: `/speakerfirm-gallery/Highlights/${name}`,
  alt: `The Speakers Firm Showcase image ${name}`,
  caption: `Speaker Presentation — Highlight ${idx + 1}`,
  location: `South Africa`,
  size: idx % 3 === 0 ? 'wide' : idx % 3 === 1 ? 'square' : 'tall'
}));

const EMPOWA_GROWTH_IMAGES: EventImage[] = [
  "_DSC8714.jpg", "_DSC8718.jpg", "_DSC8721_1.jpg", "_DSC8729.jpg", "_DSC8741.jpg",
  "_DSC8748.jpg", "_DSC8751.jpg", "_DSC8757.jpg", "_DSC8758.jpg", "_DSC8762.jpg",
  "_DSC8765_1.jpg", "_DSC8774.jpg", "_DSC8777.jpg", "_DSC8782.jpg", "_DSC8785.jpg",
  "_DSC8786.jpg", "_DSC8786_1.jpg", "_DSC8788.jpg", "_DSC8791.jpg", "_DSC8796.jpg",
  "_DSC8797.jpg", "_DSC8799.jpg", "_DSC8804.jpg", "_DSC8807.jpg", "_DSC8811.jpg",
  "_DSC8811_1.jpg", "_DSC8813.jpg", "_DSC8816.jpg", "_DSC8817.jpg", "_DSC8826.jpg",
  "_DSC8828.jpg", "_DSC8830.jpg", "_DSC8835.jpg", "_DSC8845.jpg", "_DSC8852.jpg",
  "_DSC8859.jpg", "_DSC8860.jpg", "_DSC8867.jpg", "_DSC8869.jpg", "_DSC8880.jpg",
  "_DSC8881.jpg", "_DSC8884.jpg", "_DSC8895.jpg", "_DSC8898.jpg", "_DSC8900.jpg",
  "_DSC8906.jpg", "_DSC8909.jpg", "_DSC8913.jpg", "_DSC8914.jpg", "_DSC8917.jpg",
  "_DSC9037.jpg", "_DSC9042.jpg", "_DSC9045.jpg", "_DSC9049_1.jpg", "_DSC9051.jpg",
  "_DSC9057.jpg", "_DSC9060.jpg", "_DSC9062.jpg", "_DSC9065.jpg", "_DSC9065_1.jpg",
  "_DSC9068.jpg", "_DSC9069.jpg", "_DSC9070.jpg", "_DSC9072_1.jpg", "_DSC9074.jpg",
  "_DSC9075.jpg", "_DSC9078.jpg", "_DSC9082.jpg", "_DSC9086.jpg", "_DSC9088.jpg"
].map((name, idx) => ({
  id: `eg-${idx}`,
  src: `/empowagrowth/Highlights/${name}`,
  alt: `EmpowaGrowth Showcase image ${name}`,
  caption: `EmpowaGrowth™ Session — Highlight ${idx + 1}`,
  location: `South Africa`,
  size: idx % 3 === 0 ? 'wide' : idx % 3 === 1 ? 'square' : 'tall'
}));

const EMPOWA_GROWTH_AWARDS_IMAGES: EventImage[] = [
  "_DSC8346.JPG", "_DSC8347.JPG", "_DSC8350.JPG", "_DSC8356.JPG", "_DSC8357.JPG",
  "_DSC8359.JPG", "_DSC8360.JPG", "_DSC8364.JPG", "_DSC8373.JPG", "_DSC8374.JPG",
  "_DSC8382.JPG", "_DSC8386.JPG", "_DSC8389.JPG", "_DSC8390.JPG", "_DSC8392.JPG",
  "_DSC8395.JPG", "_DSC8396.JPG", "_DSC8399.JPG", "_DSC8400.JPG", "_DSC8405.JPG",
  "_DSC8408.JPG", "_DSC8422.JPG", "_DSC8423.JPG", "_DSC8428.JPG", "_DSC8430.JPG",
  "_DSC8435.JPG", "_DSC8435_1.JPG", "_DSC8442.JPG", "_DSC8447.JPG", "_DSC8450.JPG",
  "_DSC8460.JPG", "_DSC8468.JPG", "_DSC8469.JPG", "_DSC8469_1.JPG", "_DSC8469_2.JPG",
  "_DSC8472.JPG", "_DSC8473.JPG", "_DSC8473_1.JPG", "_DSC8477.JPG", "_DSC8478.JPG",
  "_DSC8479.JPG", "_DSC8481.JPG", "_DSC8483.JPG", "_DSC8485.JPG", "_DSC8486.JPG",
  "_DSC8487.JPG", "_DSC8491.JPG", "_DSC8496.JPG", "_DSC8498.JPG", "_DSC8500.JPG",
  "_DSC8510.JPG", "_DSC8511.JPG", "_DSC8512.JPG", "_DSC8512_1.JPG", "_DSC8515.JPG",
  "_DSC8516.JPG", "_DSC8518.JPG", "_DSC8519.JPG", "_DSC8523.JPG", "_DSC8525.JPG",
  "_DSC8527.JPG", "_DSC8550.JPG", "_DSC8554.JPG", "_DSC8555.JPG", "_DSC8560.JPG",
  "_DSC8561.JPG", "_DSC8561_1.JPG", "_DSC8563.JPG", "_DSC8564.JPG", "_DSC8567.JPG",
  "_DSC8574.JPG", "_DSC8621.JPG", "_DSC8626.JPG", "_DSC8632.JPG", "_DSC8633.JPG",
  "_DSC8634.JPG", "_DSC8643.JPG", "_DSC8646.JPG", "_DSC8651.JPG", "_DSC8652.JPG",
  "_DSC8655.JPG", "_DSC8658.JPG", "_DSC8661.JPG", "_DSC8663.JPG", "_DSC8663_1.JPG",
  "_DSC8664.JPG", "_DSC8666.JPG", "_DSC8667.JPG", "_DSC8668.JPG", "_DSC8670.JPG",
  "_DSC8673.JPG", "_DSC8678.JPG", "_DSC8682.JPG", "_DSC8692.JPG", "_DSC8693.JPG",
  "_DSC8695.JPG", "_DSC8700.JPG", "_DSC8701.JPG", "_DSC8707.JPG", "_DSC8709.JPG",
  "_DSC8711.JPG", "_DSC8713.JPG", "_DSC8714.JPG", "_DSC8717.JPG", "_DSC8719.JPG",
  "_DSC8722.JPG", "_DSC8723.JPG", "_DSC8723_1.JPG", "_DSC8725.JPG", "_DSC8727.JPG",
  "_DSC8728.JPG", "_DSC8730.JPG", "_DSC8732.JPG", "_DSC8732_1.JPG", "_DSC8734.JPG",
  "_DSC8735.JPG", "_DSC8736.JPG", "_DSC8737.JPG", "_DSC8739.JPG", "_DSC8742.JPG",
  "_DSC8745.JPG", "_DSC8746.JPG", "_DSC8746_1.JPG", "_DSC8749.JPG", "_DSC8750.JPG",
  "_DSC8752.JPG", "_DSC8754.JPG", "_DSC8756.JPG", "_DSC8757.JPG", "_DSC8758.JPG",
  "_DSC8759.JPG", "_DSC8762.JPG", "_DSC8766.JPG", "_DSC8774.JPG", "_DSC8775.JPG",
  "_DSC8782.JPG", "_DSC8786.JPG", "_DSC8789.JPG", "_DSC8790.JPG", "_DSC8793.JPG",
  "_DSC8794.JPG", "_DSC8796.JPG", "_DSC8799.JPG", "_DSC8800.JPG", "_DSC8801.JPG",
  "_DSC8802.JPG", "_DSC8804.JPG", "_DSC8808.JPG", "_DSC8810.JPG", "_DSC8811.JPG",
  "_DSC8813.JPG", "_DSC8814.JPG", "_DSC8815.JPG", "_DSC8816.JPG", "_DSC8817.JPG",
  "_DSC8819.JPG"
].map((name, idx) => ({
  id: `ega-${idx}`,
  src: `/empowagrowthawards-gallery/Highlights/${name}`,
  alt: `EmpowaGrowth Awards Showcase image ${name}`,
  caption: `EmpowaGrowth™ Awards — Highlight ${idx + 1}`,
  location: `South Africa`,
  size: idx % 3 === 0 ? 'wide' : idx % 3 === 1 ? 'square' : 'tall'
}));

const DR_MZAMO_MASITO_IMAGES: EventImage[] = [
  "_DSC7749.jpg", "_DSC7753.jpg", "_DSC7755.jpg", "_DSC7757.jpg", "_DSC7766_2.jpg",
  "_DSC7768.jpg", "_DSC7773.jpg", "_DSC7782.jpg", "_DSC7786_1.jpg", "_DSC7790.jpg",
  "_DSC7798.jpg", "_DSC7799.jpg", "_DSC7803.jpg", "_DSC7811.jpg", "_DSC7813_1.jpg",
  "_DSC7816.jpg", "_DSC7826.jpg", "_DSC7827.jpg", "_DSC7831.jpg", "_DSC7832_1.jpg",
  "_DSC7838.jpg", "_DSC7839.jpg", "_DSC7844.jpg", "_DSC7850.jpg", "_DSC7851.jpg",
  "_DSC7853.jpg", "_DSC7860.jpg", "_DSC7871.jpg", "_DSC7876.jpg", "_DSC7879.jpg",
  "_DSC7885.jpg", "_DSC7888.jpg", "_DSC7891.jpg", "_DSC7893.jpg", "_DSC7900.jpg",
  "_DSC7902.jpg", "_DSC7905.jpg", "_DSC7910.jpg", "_DSC7911.jpg", "_DSC7913.jpg",
  "_DSC7917.jpg", "_DSC7919.jpg", "_DSC7922.jpg", "_DSC7926.jpg", "_DSC7929.jpg",
  "_DSC7935.jpg", "_DSC7956.jpg", "_DSC7960.jpg", "_DSC7961.jpg", "_DSC7963.jpg",
  "_DSC7965.jpg", "_DSC7970.jpg", "_DSC7972.jpg", "_DSC7973.jpg", "_DSC7974.jpg",
  "_DSC7975.jpg", "_DSC7979.jpg", "_DSC7982.jpg", "_DSC7990.jpg", "_DSC7991.jpg",
  "_DSC7992.jpg", "_DSC7994.jpg", "_DSC7997.jpg", "_DSC8002.jpg", "_DSC8005.jpg",
  "_DSC8010.jpg", "_DSC8014.jpg", "_DSC8016.jpg", "_DSC8022.jpg", "_DSC8027.jpg",
  "_DSC8032.jpg", "_DSC8034.jpg", "_DSC8035.jpg", "_DSC8043.jpg", "_DSC8045.jpg",
  "_DSC8046_1.jpg", "_DSC8049.jpg", "_DSC8050.jpg", "_DSC8056.jpg", "_DSC8056_1.jpg",
  "_DSC8057.jpg", "_DSC8058.jpg", "_DSC8060.jpg", "_DSC8062.jpg", "_DSC8065.jpg",
  "_DSC8068.jpg", "_DSC8069.jpg", "_DSC8070.jpg", "_DSC8071.jpg", "_DSC8075.jpg",
  "_DSC8077.jpg", "_DSC8078.jpg", "_DSC8080.jpg", "_DSC8083.jpg", "_DSC8084.jpg",
  "_DSC8087.jpg", "_DSC8090.jpg", "_DSC8091.jpg", "_DSC8093.jpg", "_DSC8097.jpg",
  "_DSC8103.jpg", "_DSC8104.jpg", "_DSC8105.jpg", "_DSC8107.jpg", "_DSC8109.jpg",
  "_DSC8112.jpg", "_DSC8116.jpg", "_DSC8119_1.jpg", "_DSC8123.jpg", "_DSC8126.jpg",
  "_DSC8127.jpg", "_DSC8128.jpg", "_DSC8130.jpg", "_DSC8132.jpg", "_DSC8134.jpg",
  "_DSC8137.jpg", "_DSC8139.jpg", "_DSC8140.jpg", "_DSC8141.jpg", "_DSC8143.jpg",
  "_DSC8144.jpg", "_DSC8145.jpg", "_DSC8151.jpg", "_DSC8157.jpg", "_DSC8164.jpg",
  "_DSC8167.jpg", "_DSC8170.jpg", "_DSC8173_1.jpg", "_DSC8180.jpg", "_DSC8183_1.jpg",
  "_DSC8188_1.jpg", "_DSC8192_1.jpg", "_DSC8200_1.jpg", "_DSC8203_1.jpg", "_DSC8204.jpg",
  "_DSC8210.jpg", "_DSC8217_1.jpg", "_DSC8223.jpg", "_DSC8224.jpg", "_DSC8228.jpg",
  "_DSC8230.jpg", "_DSC8233.jpg", "_DSC8243.jpg", "_DSC8255.jpg", "_DSC8258.jpg",
  "_DSC8259.jpg", "_DSC8259_1.jpg", "_DSC8260.jpg", "_DSC8261_1.jpg", "_DSC8266.jpg",
  "_DSC8268.jpg", "_DSC8269.jpg", "_DSC8270.jpg", "_DSC8272.jpg", "_DSC8273.jpg",
  "_DSC8275.jpg", "_DSC8279.jpg", "_DSC8290.jpg", "_DSC8291.jpg", "_DSC8293.jpg",
  "_DSC8295.jpg", "_DSC8296.jpg", "_DSC8297.jpg", "_DSC8300.jpg"
].map((name, idx) => ({
  id: `dmm-${idx}`,
  src: `/dr-mzamo-masito-book-conversation-at-empowaworx-house/Highlights/${name}`,
  alt: `Dr Mzamo Masito Book Conversation image ${name}`,
  caption: `Dr Mzamo Masito Book Conversation — Highlight ${idx + 1}`,
  location: `EmpowaWorx House`,
  size: idx % 3 === 0 ? 'wide' : idx % 3 === 1 ? 'square' : 'tall'
}));

const EMPOWA_ENTREPRENEURS_2026_IMAGES: EventImage[] = [
  "DSC_0002.JPG", "DSC_0008.JPG", "DSC_0025.JPG", "DSC_0028.JPG", "DSC_0032.JPG",
  "DSC_0045.JPG", "DSC_0048.JPG", "DSC_0051.JPG", "DSC_0058.JPG", "DSC_0067.JPG",
  "DSC_0072.JPG", "DSC_0075.JPG", "DSC_0079.JPG", "DSC_0082.JPG", "DSC_0088.JPG",
  "DSC_0092.JPG", "DSC_0095.JPG", "DSC_0108.JPG", "DSC_0119.JPG", "DSC_0120.JPG",
  "DSC_0128.JPG", "DSC_0128_1.JPG", "DSC_0129.JPG", "DSC_0130.JPG", "DSC_0134.JPG",
  "DSC_0135.JPG", "DSC_0139.JPG", "DSC_0141.JPG", "DSC_0142.JPG", "DSC_0142_1.JPG",
  "DSC_0145.JPG", "DSC_0148.JPG", "DSC_0149.JPG", "DSC_0150.JPG", "DSC_0150_1.JPG",
  "DSC_0152.JPG", "DSC_0154.JPG", "DSC_0155.JPG", "DSC_0156.JPG", "DSC_0159.JPG",
  "DSC_0160.JPG", "DSC_0164.JPG", "DSC_0166.JPG", "DSC_0169.JPG", "DSC_0174.JPG",
  "DSC_0177.JPG", "DSC_0179.JPG", "DSC_0180.JPG", "DSC_0184.JPG", "DSC_0188.JPG",
  "DSC_0190.JPG", "DSC_0192.JPG", "DSC_0195.JPG", "DSC_0197.JPG", "DSC_0204.JPG",
  "DSC_0209.JPG", "DSC_0221.JPG", "DSC_0225.JPG", "DSC_0230.JPG", "DSC_0241.JPG",
  "DSC_0243.JPG", "DSC_0247.JPG", "DSC_0250.JPG", "DSC_0254.JPG", "DSC_0255.JPG",
  "DSC_0259.JPG", "DSC_0263.JPG", "DSC_0265.JPG", "DSC_0268.JPG", "DSC_0268_1.JPG",
  "DSC_0274.JPG", "DSC_0277.JPG", "DSC_0287.JPG", "DSC_0288.JPG", "DSC_0290.JPG",
  "DSC_0295.JPG", "DSC_0298.JPG", "DSC_0299.JPG", "DSC_0300.JPG", "DSC_0302.JPG",
  "DSC_0303.JPG", "DSC_0320.JPG", "DSC_0322.JPG", "DSC_0332.JPG", "DSC_0333.JPG",
  "DSC_0333_1.JPG", "DSC_0336.JPG", "DSC_0338.JPG", "DSC_0341.JPG", "DSC_0342.JPG",
  "DSC_0346.JPG", "DSC_0347.JPG", "DSC_0349.JPG", "DSC_0402.JPG", "DSC_0407.JPG",
  "DSC_0410.JPG", "DSC_0415.JPG", "DSC_0416.JPG", "DSC_0426.JPG", "DSC_0438.JPG",
  "DSC_0442.JPG", "DSC_0443.JPG", "DSC_0454.JPG", "DSC_0475.JPG", "DSC_0479.JPG",
  "DSC_0483.JPG", "DSC_0486.JPG", "DSC_0493.JPG", "DSC_0525.JPG", "DSC_0539.JPG",
  "DSC_0576.JPG", "DSC_0582.JPG", "DSC_0584.JPG", "DSC_0588.JPG", "DSC_0614.JPG",
  "DSC_0621.JPG", "DSC_0623.JPG", "DSC_0629.JPG", "DSC_0647.JPG", "DSC_0659.JPG",
  "DSC_0664.JPG", "DSC_0677.JPG", "DSC_0678.JPG", "DSC_0684.JPG", "DSC_0720.JPG",
  "DSC_0725.JPG", "DSC_0738.JPG", "DSC_0752.JPG", "DSC_0762.JPG", "DSC_0763.JPG",
  "DSC_0766.JPG", "DSC_0768.JPG", "DSC_0778.JPG", "DSC_0802.JPG", "DSC_0805.JPG",
  "DSC_0840.JPG", "DSC_0848.JPG", "DSC_0858.JPG", "DSC_4073.JPG", "DSC_4077.JPG",
  "DSC_4079.JPG", "DSC_4089.JPG", "DSC_4096.JPG", "DSC_4101.JPG", "DSC_4103.JPG",
  "DSC_4108.JPG", "DSC_4116.JPG", "DSC_4118.JPG", "DSC_4121.JPG", "DSC_4135.JPG",
  "DSC_4137.JPG", "DSC_4140.JPG", "DSC_9353.JPG", "DSC_9369.JPG", "DSC_9375.JPG",
  "DSC_9377.JPG", "DSC_9427.JPG", "DSC_9429.JPG", "DSC_9433.JPG", "DSC_9434.JPG",
  "DSC_9438.JPG", "DSC_9448.JPG", "DSC_9454.JPG", "DSC_9457.JPG", "DSC_9460.JPG",
  "DSC_9470.JPG", "DSC_9500.JPG", "DSC_9505.JPG", "DSC_9510.JPG", "DSC_9516.JPG",
  "DSC_9518.JPG", "DSC_9520.JPG", "DSC_9525.JPG", "DSC_9528.JPG", "DSC_9536.JPG",
  "DSC_9537.JPG", "DSC_9539.JPG", "DSC_9540.JPG", "DSC_9542.JPG", "DSC_9551.JPG",
  "DSC_9554.JPG", "DSC_9571.JPG", "DSC_9580.JPG", "DSC_9602.JPG", "DSC_9605.JPG",
  "DSC_9613.JPG", "DSC_9619.JPG", "DSC_9620.JPG", "DSC_9632.JPG", "DSC_9633.JPG",
  "DSC_9635.JPG", "DSC_9644.JPG", "DSC_9646.JPG", "DSC_9653.JPG", "DSC_9653_1.JPG",
  "DSC_9654.JPG", "DSC_9664.JPG", "DSC_9670.JPG", "DSC_9675.JPG", "DSC_9681.JPG",
  "DSC_9691.JPG", "DSC_9704.JPG", "DSC_9706.JPG", "DSC_9707.JPG", "DSC_9716.JPG",
  "DSC_9718.JPG", "DSC_9720.JPG", "DSC_9721.JPG", "DSC_9733.JPG", "DSC_9735.JPG",
  "DSC_9737.JPG", "DSC_9739.JPG", "DSC_9747.JPG", "DSC_9747_1.JPG", "DSC_9752.JPG",
  "DSC_9755.JPG", "DSC_9756.JPG", "DSC_9758.JPG", "DSC_9761.JPG", "DSC_9772.JPG",
  "DSC_9774.JPG", "DSC_9776.JPG", "DSC_9777.JPG", "DSC_9785.JPG", "DSC_9788.JPG",
  "DSC_9794.JPG", "DSC_9796.JPG", "DSC_9803.JPG", "DSC_9807.JPG", "DSC_9811.JPG",
  "DSC_9812.JPG", "DSC_9815.JPG", "DSC_9816.JPG", "DSC_9822.JPG", "DSC_9827.JPG",
  "DSC_9830.JPG", "DSC_9834.JPG", "DSC_9836.JPG", "DSC_9837.JPG", "DSC_9838.JPG",
  "DSC_9843.JPG", "DSC_9852.JPG", "DSC_9853.JPG", "DSC_9856.JPG", "DSC_9867.JPG",
  "DSC_9869.JPG", "DSC_9870.JPG", "DSC_9872.JPG", "DSC_9874.JPG", "DSC_9875.JPG",
  "DSC_9877.JPG", "DSC_9878.JPG", "DSC_9879.JPG", "DSC_9880.JPG", "DSC_9884.JPG",
  "DSC_9887.JPG", "DSC_9888.JPG", "DSC_9891.JPG", "DSC_9905.JPG", "DSC_9917.JPG",
  "DSC_9920.JPG", "DSC_9924.JPG", "DSC_9927.JPG", "DSC_9941.JPG", "DSC_9943.JPG",
  "DSC_9945.JPG", "DSC_9955.JPG", "DSC_9962.JPG", "DSC_9965.JPG", "DSC_9966.JPG",
  "DSC_9970.JPG", "DSC_9973.JPG", "DSC_9984.JPG", "DSC_9988.JPG", "DSC_9994.JPG",
  "DSC_9996.JPG", "DSC_9997.JPG"
].map((name, idx) => ({
  id: `eefs-${idx}`,
  src: `/empowaentreneurs-funding-summit-2026/Highlights/${name}`,
  alt: `EmpowaEntrepreneurs Funding Summit image ${name}`,
  caption: `EmpowaEntrepreneurs™ Funding Summit — Highlight ${idx + 1}`,
  location: `South Africa`,
  size: idx % 3 === 0 ? 'wide' : idx % 3 === 1 ? 'square' : 'tall'
}));

const EMPOWA_YOUTH_VAAL_DAY3_IMAGES: EventImage[] = [
  "AD1A7677.JPG", "AD1A7682.JPG", "AD1A7694.JPG", "AD1A7698.JPG", "AD1A7702.JPG",
  "AD1A7707.JPG", "AD1A7720.JPG", "AD1A7739.JPG", "AD1A7739_1.JPG", "AD1A7749.JPG",
  "AD1A7757.JPG", "AD1A7890.JPG", "AD1A7890_1.JPG", "AD1A7895.JPG", "AD1A8328.JPG",
  "DSC_2853.JPG", "DSC_2855.JPG", "DSC_2855_1.JPG", "DSC_2871.JPG", "DSC_2876.JPG",
  "DSC_2880.JPG", "DSC_2890.JPG", "DSC_2899.JPG", "DSC_2901.JPG", "DSC_2907.JPG",
  "DSC_2914.JPG", "DSC_2917.JPG", "DSC_2929.JPG", "DSC_2929_1.JPG", "DSC_2933.JPG",
  "DSC_2934.JPG", "DSC_2936.JPG", "DSC_2942.JPG", "DSC_2946.JPG", "DSC_2949.JPG",
  "DSC_2949_1.JPG", "DSC_2953.JPG", "DSC_2969.JPG", "DSC_2977.JPG", "DSC_2977_1.JPG",
  "DSC_2980.JPG", "DSC_2981.JPG", "DSC_2981_1.JPG", "DSC_2982.JPG", "DSC_2982_1.JPG",
  "DSC_2984.JPG", "DSC_2984_1.JPG", "DSC_2985.JPG", "DSC_2988.JPG", "DSC_2999.JPG",
  "DSC_3000.JPG", "DSC_3022.JPG", "DSC_3022_1.JPG", "DSC_3026.JPG", "DSC_3028.JPG",
  "DSC_3032.JPG", "DSC_3034.JPG", "DSC_3038.JPG", "DSC_3040.JPG", "DSC_3044.JPG",
  "DSC_3047.JPG", "DSC_3049.JPG", "DSC_3051.JPG", "DSC_3053.JPG", "DSC_3055.JPG",
  "DSC_3056.JPG", "DSC_3057.JPG", "DSC_3057_1.JPG", "DSC_3059.JPG", "DSC_3059_1.JPG",
  "DSC_3062.JPG", "DSC_3065.JPG", "DSC_3067.JPG", "DSC_3071.JPG", "DSC_3072.JPG",
  "DSC_3074.JPG", "DSC_3078.JPG", "DSC_3079.JPG", "DSC_3079_1.JPG", "DSC_3080.JPG",
  "DSC_3088.JPG", "DSC_3092.JPG", "DSC_3101.JPG", "DSC_3104.JPG", "DSC_3117.JPG",
  "DSC_3131.JPG", "DSC_3140.JPG", "DSC_3141.JPG", "DSC_3151.JPG", "DSC_3151_1.JPG",
  "DSC_3168.JPG", "DSC_7789.JPG", "DSC_7792.JPG", "DSC_7792_1.JPG", "DSC_7792_2.JPG",
  "DSC_7793.JPG", "DSC_7794.JPG", "DSC_7796.JPG", "DSC_7796_1.JPG", "DSC_7797.JPG",
  "DSC_7799.JPG", "DSC_7801.JPG", "DSC_7802.JPG", "DSC_7803.JPG", "DSC_7804.JPG",
  "DSC_7806.JPG", "DSC_7806_1.JPG", "DSC_7806_2.JPG", "DSC_7815.JPG", "DSC_7843.JPG",
  "DSC_7844.JPG", "DSC_7848.JPG", "DSC_7848_1.JPG", "DSC_7853.JPG", "DSC_7857.JPG",
  "DSC_7857_1.JPG", "DSC_7859.JPG", "DSC_7863.JPG", "DSC_7869.JPG", "DSC_7874.JPG",
  "DSC_7875.JPG", "DSC_7877.JPG", "DSC_7878.JPG", "DSC_7879.JPG", "DSC_7881.JPG",
  "DSC_7883.JPG", "DSC_7883_1.JPG", "DSC_7884.JPG", "DSC_7885.JPG", "DSC_7886.JPG",
  "DSC_7887.JPG", "DSC_7887_1.JPG", "DSC_7888.JPG", "DSC_7889.JPG", "DSC_7891.JPG",
  "DSC_7892.JPG", "DSC_7892_1.JPG", "DSC_7893.JPG", "DSC_7894.JPG", "DSC_7894_1.JPG",
  "DSC_7895.JPG", "DSC_7896.JPG", "DSC_7897.JPG", "DSC_7898.JPG", "DSC_7900.JPG",
  "DSC_7901.JPG", "DSC_7902.JPG", "DSC_7903.JPG", "DSC_7904.JPG", "DSC_7905.JPG",
  "DSC_7906.JPG", "DSC_7907.JPG", "DSC_7908.JPG", "DSC_7909.JPG", "DSC_7910.JPG",
  "DSC_7911.JPG", "DSC_7911_1.JPG", "DSC_7912_1.JPG", "DSC_7913.JPG", "DSC_7913_2.JPG",
  "DSC_7914.JPG", "DSC_7915.JPG", "DSC_7916.JPG", "DSC_7917.JPG", "DSC_7918.JPG",
  "DSC_7919.JPG", "DSC_7919_1.JPG", "DSC_7920.JPG", "DSC_7921_1.JPG", "DSC_7922_1.JPG",
  "DSC_7923.JPG", "DSC_7924.JPG", "DSC_7925.JPG", "DSC_7926.JPG", "DSC_7927.JPG",
  "DSC_7928.JPG", "DSC_7929.JPG", "DSC_7930.JPG", "DSC_7931.JPG", "DSC_7933.JPG",
  "DSC_7934.JPG", "DSC_7935.JPG", "DSC_7937.JPG", "DSC_7939.JPG", "DSC_7940.JPG",
  "DSC_7941.JPG", "DSC_7942.JPG", "DSC_7943.JPG", "DSC_7944.JPG", "DSC_7945.JPG",
  "DSC_7946.JPG", "DSC_7947.JPG", "DSC_7948.JPG", "DSC_7949.JPG", "DSC_7950.JPG",
  "DSC_7951.JPG", "DSC_7952.JPG", "DSC_7956.JPG", "DSC_7959.JPG", "DSC_7960.JPG",
  "DSC_7962.JPG", "DSC_7963.JPG", "DSC_7964.JPG", "DSC_7967.JPG", "DSC_7968.JPG",
  "DSC_7969.JPG", "DSC_7970.JPG", "DSC_7971.JPG", "DSC_7977.JPG", "DSC_7989.JPG",
  "DSC_7990.JPG", "DSC_7992.JPG", "DSC_8004.JPG", "DSC_8028.JPG", "DSC_8032.JPG",
  "DSC_8035.JPG", "DSC_8037.JPG", "DSC_8037_1.JPG", "DSC_8045.JPG", "DSC_8047.JPG",
  "DSC_8052.JPG", "DSC_8060.JPG", "DSC_8066.JPG", "DSC_8091.JPG", "DSC_8091_1.JPG",
  "DSC_8093.JPG", "DSC_8095.JPG", "DSC_8102.JPG", "DSC_8103.JPG", "DSC_8111.JPG",
  "DSC_8121.JPG", "DSC_8128.JPG", "DSC_8160.JPG", "DSC_8163.JPG", "DSC_8181.JPG",
  "DSC_8205.JPG", "DSC_8208.JPG", "DSC_8215.JPG", "DSC_8216.JPG", "DSC_8219.JPG",
  "DSC_8225.JPG", "DSC_8227.JPG", "DSC_8235.JPG", "DSC_8248.JPG", "DSC_8307.JPG",
  "DSC_8308.JPG", "DSC_8310.JPG", "DSC_8311.JPG", "DSC_8333.JPG", "DSC_8344.JPG",
  "DSC_8351.JPG", "DSC_8364.JPG", "DSC_8403.JPG", "DSC_8408.JPG", "DSC_8427.JPG",
  "DSC_8434.JPG", "DSC_8440.JPG", "DSC_8442.JPG", "DSC_8454.JPG", "DSC_8484.JPG",
  "DSC_8491.JPG", "VCD_1580.JPG", "VCD_1599.JPG", "VCD_1602.JPG", "VCD_1603.JPG",
  "VCD_1609.JPG", "VCD_1616.JPG"
].map((name, idx) => ({
  id: `eyv3-${idx}`,
  src: `/empowayouth-vaal-weekday-3/Highlights/${name}`,
  alt: `EmpowaYouth Vaal Week Day 3 image ${name}`,
  caption: `EmpowaYouth™ Vaal Week Day 3 — Highlight ${idx + 1}`,
  location: `Vaal, South Africa`,
  size: idx % 3 === 0 ? 'wide' : idx % 3 === 1 ? 'square' : 'tall'
}));

const EMPOWAMEN_SUMMIT_2019_IMAGES: EventImage[] = [
  "2019-main.jpg", "2019-1.jpg", "2019-2.jpg", "2019-3.jpg", "2019-4.jpg", "2019-5.jpg",
  "2019-6.jpg", "2019-7.jpg", "2019-8.jpg", "2019-9.jpg", "2019-10.jpg", "2019-11.jpg",
  "2019-12.jpg", "2019-13.jpg", "2019-14.jpg", "2019-15.jpg", "2019-16.jpg", "2019-17.jpg",
  "2019-18.jpg", "2019-19.jpg"
].map((name, idx) => ({
  id: `em19-${idx}`,
  src: `/EmpowamenSummit2019/${name}`,
  alt: `EmpowaMen Summit 2019 image ${name}`,
  caption: `EmpowaMen™ Summit 2019 — Highlight ${idx + 1}`,
  location: `South Africa`,
  size: idx % 3 === 0 ? 'wide' : idx % 3 === 1 ? 'square' : 'tall'
}));

const EMPOWAMEN_SUMMIT_2023_IMAGES: EventImage[] = [
  "2023-main.jpg", "2023-1.jpg", "2023-2.jpg", "2023-3.jpg", "2023-4.jpg", "2023-5.jpg",
  "2023-6.jpg", "2023-7.jpg", "2023-8.jpg", "2023-9.jpg", "2023-10.jpg", "2023-11.jpg",
  "2023-12.jpg", "2023-13.jpg", "2023-14.jpg", "2023-15.jpg", "2023-16.jpg", "2023-17.jpg",
  "2023-18.jpg", "2023-19.jpg"
].map((name, idx) => ({
  id: `em23-${idx}`,
  src: `/EmpowamenSummit2023/${name}`,
  alt: `EmpowaMen Summit 2023 image ${name}`,
  caption: `EmpowaMen™ Summit 2023 — Highlight ${idx + 1}`,
  location: `South Africa`,
  size: idx % 3 === 0 ? 'wide' : idx % 3 === 1 ? 'square' : 'tall'
}));

const BUBBLES_NIBBLES_IMAGES: EventImage[] = [
  "DSC_1533.JPG", "DSC_2597.JPG", "DSC_2615.JPG", "DSC_2632.JPG", "DSC_2645.JPG",
  "DSC_2657.JPG", "DSC_2683.JPG", "DSC_2708.JPG", "DSC_2737.JPG", "DSC_2742.JPG",
  "DSC_2778.JPG", "DSC_2791.JPG", "DSC_2796.JPG", "DSC_2820.JPG", "DSC_2825.JPG",
  "DSC_2835.JPG", "DSC_2921.JPG", "DSC_2925.JPG", "DSC_2930.JPG", "DSC_2937.JPG",
  "DSC_2940.JPG", "DSC_2948.JPG"
].map((name, idx) => ({
  id: `bn-${idx}`,
  src: `/bubbles_nibbles_gallery/${name}`,
  alt: `EmpowaWomen Bubbles & Nibbles Soirée image ${name}`,
  caption: `Bubbles & Nibbles Soirée — Highlight ${idx + 1}`,
  location: `South Africa`,
  size: idx % 3 === 0 ? 'wide' : idx % 3 === 1 ? 'square' : 'tall'
}));

EVENT_GROUPS.push(
  {
    id: 'ev-bn',
    eyebrow: 'EmpowaWomen™ Soirée',
    title: 'EmpowaWomen™ Bubbles & Nibbles Soirée Highlights',
    location: 'South Africa',
    date: '2024',
    description: 'Celebrating power, connection, and social impact during the EmpowaWomen™ Bubbles & Nibbles Soirée, featuring the launch of the inaugural EmpowaWomen™ Awards.',
    platform: 'EmpowaWomen™',
    images: BUBBLES_NIBBLES_IMAGES
  },
  {
    id: 'ev-em23',
    eyebrow: 'EmpowaMen™ Summit',
    title: 'EmpowaMen™ Summit 2023 Highlights',
    location: 'South Africa',
    date: '2023',
    description: 'Celebrating key milestones, deep dialogues, and legacy impact during the 2023 EmpowaMen™ Summit.',
    platform: 'EmpowaMen™',
    images: EMPOWAMEN_SUMMIT_2023_IMAGES
  },
  {
    id: 'ev-em19',
    eyebrow: 'EmpowaMen™ Summit',
    title: 'EmpowaMen™ Summit 2019 Highlights',
    location: 'South Africa',
    date: '2019',
    description: 'Fostering leadership, personal growth, and positive social impact for men across the continent during the 2019 Summit.',
    platform: 'EmpowaMen™',
    images: EMPOWAMEN_SUMMIT_2019_IMAGES
  },
  {
    id: 'ev-eefs1',
    eyebrow: 'EmpowaEntrepreneurs™ Summit',
    title: 'EmpowaEntrepreneurs™ Funding Summit 2026',
    location: 'South Africa',
    date: '2026',
    description: 'Celebrating high-value connection, capacity-building, and funding opportunities for forward-thinking entrepreneurs and business owners.',
    platform: 'EmpowaEntrepreneurs™',
    images: EMPOWA_ENTREPRENEURS_2026_IMAGES
  },
  {
    id: 'ev-eyv3',
    eyebrow: 'EmpowaYouth™ Vaal Week',
    title: 'EmpowaYouth™ Vaal Week Day 3 Highlights',
    location: 'Vaal, South Africa',
    date: '2026',
    description: 'Fostering innovation, skill development, and dynamic collaborations during Vaal EmpowaYouth Week.',
    platform: 'EmpowaYouth™',
    images: EMPOWA_YOUTH_VAAL_DAY3_IMAGES
  },
  {
    id: 'ev-sf1',
    eyebrow: 'The Speakers Firm™',
    title: 'The Speakers Firm™ Showcase',
    location: 'South Africa',
    date: '2025',
    description: 'A curated showcase of dynamic speakers, masterclasses, and keynote presentations delivering impactful knowledge transfer across industries.',
    platform: 'The Speakers Firm™',
    images: SPEAKER_FIRM_IMAGES
  },
  {
    id: 'ev-eg1',
    eyebrow: 'EmpowaGrowth™ Highlights',
    title: 'EmpowaGrowth™ Forums & Masterclasses',
    location: 'South Africa',
    date: '2025',
    description: 'Empowering businesses, MSMEs, and professionals through custom capacity-building initiatives and structured market growth sessions.',
    platform: 'EmpowaGrowth™',
    images: EMPOWA_GROWTH_IMAGES
  },
  {
    id: 'ev-ega1',
    eyebrow: 'EmpowaGrowth™ Awards',
    title: 'EmpowaGrowth™ Awards & Gala',
    location: 'South Africa',
    date: '2025',
    description: 'Celebrating excellence, outstanding achievements, and impactful contributions of growth-driven enterprises and leaders.',
    platform: 'EmpowaGrowth™',
    images: EMPOWA_GROWTH_AWARDS_IMAGES
  },
  {
    id: 'ev-dmm1',
    eyebrow: 'EmpowaWorx House Event',
    title: 'Dr Mzamo Masito Book Conversation',
    location: 'EmpowaWorx House',
    date: '2026',
    description: 'An exclusive and insightful evening hosting Dr Mzamo Masito for an engaging book conversation, exploring leadership, branding, and industry transformation.',
    platform: 'EmpowaWorx™',
    images: DR_MZAMO_MASITO_IMAGES
  }
);

// ─── Press Articles ──────────────────────────────────────────────────────────

const PRESS_ARTICLES: PressArticle[] = [{
  id: 'a7',
  category: 'Media Coverage',
  date: '9 August 2024',
  readTime: '3 min read',
  title: "Women's Day | Empowering women in manufacturing sector",
  excerpt: 'As South Africa commemorates Women\'s Day, the question of transformation and inclusion in the manufacturing sector will be in the spotlight this year. The Empowawomen Leadership Summit to be held later this month, will take industry insights and women leadership to the next level.',
  image: '/6empowaworx-16.jpg',
  url: 'https://www.enca.com/business/womens-day-empowering-women-manufacturing-sector',
  featured: true,
  platform: 'EmpowaWomen™'
}, {
  id: 'a8',
  category: 'Summit',
  date: '14 August 2024',
  readTime: '4 min read',
  title: 'Pioneering Innovation in Agriculture & Energy: IAEOZ Summit Expands to South Africa',
  excerpt: 'The debut of the Innovation in Agriculture & Energy Opportunity Zone (IAEOZ) Summit in Cape Town bridges American minority businesses and African innovators to foster trade, partnerships, and smart farming.',
  image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&q=80',
  url: 'https://proagri.co.za/pioneering-innovation-in-agriculture-energy-iaeoz-summit-expands-to-south-africa/',
  platform: 'EmpowaGrowth™'
}, {
  id: 'a9',
  category: 'Awards',
  date: '16 September 2024',
  readTime: '3 min read',
  title: 'EmpowaWomen Awards Recognise Empowerment, Diversity and Social Impact',
  excerpt: 'The inaugural EmpowaWomen Awards were launched during the EmpowaWomen Bubbles & Nibbles Soirée, recognizing trailblazing women who have made significant contributions across various industries and communities.',
  image: '/empowaworx-12.jpg',
  url: 'https://www.citizen.co.za/randburg-sun/news-headlines/2024/09/16/empowawomen-awards-recognise-empowerment-diversity-and-social-impact/',
  platform: 'EmpowaWomen™'
}, {
  id: 'a10',
  category: 'Thought Leadership',
  date: '17 September 2024',
  readTime: '5 min read',
  title: 'Authenticity Unlocks Impact: Zaz Molo on Choosing the Right Voices',
  excerpt: 'Zaz Molo, head of The Speakers Firm, shares insights on combining strategic thinking with storytelling, and how curating authentic voices creates a meaningful impact.',
  image: '/articles-2.jpg',
  url: 'https://www.news24.com/citypress/trending/authenticity-unlocks-impact-zaz-molo-on-choosing-the-right-voices-20240917',
  platform: 'The Speakers Firm™'
}, {
  id: 'a11',
  category: 'Media Coverage',
  date: '26 September 2024',
  readTime: '2 min read',
  title: 'Empowa Youth Summit Inspires Hope for Job Creation in Thaba Nchu',
  excerpt: 'The Empowa Youth Summit in Thaba Nchu, Free State, brought hope to hundreds of unemployed young people, linking them with skills training and job opportunities in critical local sectors.',
  image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&q=80',
  url: 'https://www.insiderchronicle.co.za/empowa-youth-summit-inspires-hope-for-job-creation-in-thaba-nchu/',
  platform: 'EmpowaYouth™'
}, {
  id: 'a12',
  category: 'Media Coverage',
  date: '25 September 2024',
  readTime: '2 min read',
  title: 'All About Careers at Youth Summit in Thaba Nchu',
  excerpt: 'OFM covers the Thaba Nchu Youth Summit, highlighting career guidance, entrepreneurial funding, and development programmes aimed at tackling youth unemployment.',
  image: '/empowayouth-vaal-weekday-3/Highlights/DSC_2946.JPG',
  url: 'https://www.ofm.co.za/article/centralsa/333861/all-about-careers-at-youth-summit-in-thaba-nchu-',
  platform: 'EmpowaYouth™'
}];

// ─── Video Items ─────────────────────────────────────────────────────────────

const VIDEO_ITEMS: VideoItem[] = [{
  id: 'v1',
  title: 'The EmpowaEntrepreneurs Funding Summit’2026',
  subtitle: 'EmpowaEntrepreneurs Funding Summit Highlights',
  duration: '2:55',
  date: '6 June 2026',
  thumbnail: 'https://img.youtube.com/vi/u6CtE7u5Oys/hqdefault.jpg',
  category: 'Summit Highlights',
  size: 'large',
  youtubeId: 'u6CtE7u5Oys',
  platform: 'EmpowaEntrepreneurs™'
}, {
  id: 'v2',
  title: 'Day 5 - Entrepreneurship & Innovation Ecosystems, Funding | Vaal EmpowaYouth Week',
  subtitle: 'Vaal EmpowaYouth Week Highlights',
  duration: '2:32',
  date: 'May 2026',
  thumbnail: 'https://img.youtube.com/vi/PN0iTQk0AKY/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'medium',
  youtubeId: 'PN0iTQk0AKY',
  platform: 'EmpowaYouth™'
}, {
  id: 'v3',
  title: 'Day 4 - Green Economy & Climate Innovation | Vaal EmpowaYouth Week',
  subtitle: 'Vaal EmpowaYouth Week Highlights',
  duration: '2:04',
  date: 'May 2026',
  thumbnail: 'https://img.youtube.com/vi/uL27g45XEEQ/hqdefault.jpg',
  category: 'Climate & Agritech',
  size: 'medium',
  youtubeId: 'uL27g45XEEQ',
  platform: 'EmpowaYouth™'
}, {
  id: 'v4',
  title: 'Day 2 - Youth Economy AI, Automation & Tech | Vaal EmpowaYouth Week',
  subtitle: 'AI, Automation & Tech Economy',
  duration: '2:33',
  date: 'May 2026',
  thumbnail: 'https://img.youtube.com/vi/DLwpRVZuFE8/hqdefault.jpg',
  category: 'Tech Economy',
  size: 'small',
  youtubeId: 'DLwpRVZuFE8',
  platform: 'EmpowaYouth™'
}, {
  id: 'v5',
  title: 'Day 3 - Creative, Digital Content & Film Economy | Vaal EmpowaYouth Week',
  subtitle: 'Creative & Digital Economy Highlights',
  duration: '2:24',
  date: 'May 2026',
  thumbnail: 'https://img.youtube.com/vi/VPlCuJRxzBU/hqdefault.jpg',
  category: 'Creative Industry',
  size: 'small',
  youtubeId: 'VPlCuJRxzBU',
  platform: 'EmpowaYouth™'
}, {
  id: 'v6',
  title: 'Day 1 - Health, Wellness & Longevity Economy | Vaal EmpowaYouth Week',
  subtitle: 'Powering the Youth Economy',
  duration: '2:22',
  date: 'May 2026',
  thumbnail: 'https://img.youtube.com/vi/v4adN4XIgEw/hqdefault.jpg',
  category: 'Health & Wellness',
  size: 'small',
  youtubeId: 'v4adN4XIgEw',
  platform: 'EmpowaYouth™'
}, {
  id: 'v7',
  title: 'EmpowaMen Breakaway Reel: Future of a Boy Child',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:20',
  date: 'June 2026',
  thumbnail: 'https://img.youtube.com/vi/X3NBMSAGsvo/hqdefault.jpg',
  category: 'Leadership Advisory',
  size: 'medium',
  youtubeId: 'X3NBMSAGsvo',
  platform: 'EmpowaMen™'
}, {
  id: 'v8',
  title: 'EmpowaMen Breakaway: Substance Abuse',
  subtitle: 'EmpowaMen Highlights',
  duration: '2:40',
  date: 'May 2026',
  thumbnail: 'https://img.youtube.com/vi/DCwzK33UEN4/hqdefault.jpg',
  category: 'Strategic Advisory',
  size: 'small',
  youtubeId: 'DCwzK33UEN4',
  platform: 'EmpowaMen™'
}, {
  id: 'v9',
  title: 'EmpowaMen 2024: GBV Panel',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:05',
  date: 'May 2026',
  thumbnail: 'https://img.youtube.com/vi/-bX6YTFXwEA/hqdefault.jpg',
  category: 'Brand Experience',
  size: 'small',
  youtubeId: '-bX6YTFXwEA',
  platform: 'EmpowaMen™'
}, {
  id: 'v10',
  title: 'EmpowaMen Experience 2024',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:15',
  date: 'April 2026',
  thumbnail: 'https://img.youtube.com/vi/T2JaWH3ZAdg/hqdefault.jpg',
  category: 'Executive Influence',
  size: 'medium',
  youtubeId: 'T2JaWH3ZAdg',
  platform: 'EmpowaMen™'
}, {
  id: 'v11',
  title: 'Phelelani G Nzuza',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:45',
  date: 'April 2026',
  thumbnail: 'https://img.youtube.com/vi/NJ-eZ8OxrTk/hqdefault.jpg',
  category: 'Ecosystem Building',
  size: 'small',
  youtubeId: 'NJ-eZ8OxrTk',
  platform: 'EmpowaMen™'
}, {
  id: 'v12',
  title: 'Siya Khumalo',
  subtitle: 'EmpowaMen Highlights',
  duration: '2:50',
  date: 'March 2026',
  thumbnail: 'https://img.youtube.com/vi/EgCndLBEPls/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'small',
  youtubeId: 'EgCndLBEPls',
  platform: 'EmpowaMen™'
}, {
  id: 'v13',
  title: 'Mbuyiselo Botha',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:10',
  date: 'March 2026',
  thumbnail: 'https://img.youtube.com/vi/jqBxovyJ3A8/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'medium',
  youtubeId: 'jqBxovyJ3A8',
  platform: 'EmpowaMen™'
}, {
  id: 'v14',
  title: 'Josina Machel',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:30',
  date: 'February 2026',
  thumbnail: 'https://img.youtube.com/vi/sV7r50uNrH4/hqdefault.jpg',
  category: 'Brand Advisory',
  size: 'small',
  youtubeId: 'sV7r50uNrH4',
  platform: 'EmpowaMen™'
}, {
  id: 'v15',
  title: 'Joshua Maponga',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:15',
  date: 'February 2026',
  thumbnail: 'https://img.youtube.com/vi/X0OCEz15Whw/hqdefault.jpg',
  category: 'Corporate Trust',
  size: 'small',
  youtubeId: 'X0OCEz15Whw',
  platform: 'EmpowaMen™'
}, {
  id: 'v16',
  title: 'Ceasar Molabatse',
  subtitle: 'EmpowaMen Highlights',
  duration: '2:55',
  date: 'January 2026',
  thumbnail: 'https://img.youtube.com/vi/0XhKp5IGuBY/hqdefault.jpg',
  category: 'ESG Advisory',
  size: 'medium',
  youtubeId: '0XhKp5IGuBY',
  platform: 'EmpowaMen™'
}, {
  id: 'v17',
  title: 'Dr Gugulethu Xaba',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:35',
  date: 'January 2026',
  thumbnail: 'https://img.youtube.com/vi/n7W8q5ahnRI/hqdefault.jpg',
  category: 'Entrepreneurs Network',
  size: 'small',
  youtubeId: 'n7W8q5ahnRI',
  platform: 'EmpowaMen™'
}, {
  id: 'v18',
  title: 'EmpowaYouth Impact & Career Expo',
  subtitle: 'EmpowaYouth Highlights',
  duration: '4:20',
  date: 'June 2026',
  thumbnail: 'https://img.youtube.com/vi/5EGk7NpNk1Y/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'medium',
  youtubeId: '5EGk7NpNk1Y',
  platform: 'EmpowaYouth™'
}, {
  id: 'v19',
  title: 'EmpowaWomen Leadership Dinner & Awards',
  subtitle: 'EmpowaWomen Highlights',
  duration: '3:50',
  date: 'June 2026',
  thumbnail: 'https://img.youtube.com/vi/ej43YkR5UUs/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'small',
  youtubeId: 'ej43YkR5UUs',
  platform: 'EmpowaYouth™'
}, {
  id: 'v20',
  title: 'EmpowaYouth Entrepreneurship Masterclass',
  subtitle: 'EmpowaYouth Highlights',
  duration: '3:15',
  date: 'June 2026',
  thumbnail: 'https://img.youtube.com/vi/iX7ERF0ftok/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'small',
  youtubeId: 'iX7ERF0ftok',
  platform: 'EmpowaYouth™'
}, {
  id: 'v21',
  title: 'EmpowaYouth Careers & Skills Summit',
  subtitle: 'EmpowaYouth Highlights',
  duration: '2:40',
  date: 'June 2026',
  thumbnail: 'https://img.youtube.com/vi/FkZwj1LYuJU/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'medium',
  youtubeId: 'FkZwj1LYuJU',
  platform: 'EmpowaYouth™'
}, {
  id: 'v22',
  title: 'The Speakers Firm Keynote Showcase',
  subtitle: 'The Speakers Firm Highlights',
  duration: '4:15',
  date: 'June 2026',
  thumbnail: 'https://img.youtube.com/vi/fI2uQHu8C3A/hqdefault.jpg',
  category: 'Speaker Bureau',
  size: 'medium',
  youtubeId: 'fI2uQHu8C3A',
  platform: 'The Speakers Firm™'
}, {
  id: 'v23',
  title: 'The Speakers Firm Masterclass Session',
  subtitle: 'The Speakers Firm Highlights',
  duration: '3:30',
  date: 'June 2026',
  thumbnail: 'https://img.youtube.com/vi/Xb2VPORlJ5U/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'small',
  youtubeId: 'Xb2VPORlJ5U',
  platform: 'The Speakers Firm™'
}, {
  id: 'v24',
  title: "Women's Fund Room at EmpowaEntrepreneur Funding Summit 2025",
  subtitle: 'EmpowaEntrepreneurs Highlights',
  duration: '3:00',
  date: 'June 2026',
  thumbnail: 'https://img.youtube.com/vi/jJIv3Y_jKI8/hqdefault.jpg',
  category: 'Summit Highlights',
  size: 'medium',
  youtubeId: 'jJIv3Y_jKI8',
  platform: 'EmpowaEntrepreneurs™'
}, {
  id: 'v25',
  title: 'Venture Capital Industry Breakaway - EmpowaEntrepreneur Funding Summit 2025',
  subtitle: 'EmpowaEntrepreneurs Highlights',
  duration: '3:25',
  date: 'June 2025',
  thumbnail: 'https://img.youtube.com/vi/2_VXFo4l1lk/hqdefault.jpg',
  category: 'Summit Highlights',
  size: 'medium',
  youtubeId: '2_VXFo4l1lk',
  platform: 'EmpowaEntrepreneurs™'
}, {
  id: 'v26',
  title: 'Private Equity Industry Breakaway - EmpowaEntrepreneurs Funding Summit 2025',
  subtitle: 'EmpowaEntrepreneurs Highlights',
  duration: '2:50',
  date: 'June 2025',
  thumbnail: 'https://img.youtube.com/vi/8G0_VSWCfXg/hqdefault.jpg',
  category: 'Summit Highlights',
  size: 'small',
  youtubeId: '8G0_VSWCfXg',
  platform: 'EmpowaEntrepreneurs™'
}, {
  id: 'v27',
  title: "Loan Finance Industry Breakaway - EmpowaEntrepreneur Funding Summit' 2025",
  subtitle: 'EmpowaEntrepreneurs Highlights',
  duration: '3:10',
  date: 'June 2025',
  thumbnail: 'https://img.youtube.com/vi/iYdjDQ8OwzI/hqdefault.jpg',
  category: 'Summit Highlights',
  size: 'small',
  youtubeId: 'iYdjDQ8OwzI',
  platform: 'EmpowaEntrepreneurs™'
}, {
  id: 'v28',
  title: "Impact Fund Industry Stage - EmpowaEntrepreneur Funding Summit'2026",
  subtitle: 'EmpowaEntrepreneurs Highlights',
  duration: '4:05',
  date: 'June 2026',
  thumbnail: 'https://img.youtube.com/vi/F-Bdnokp8u8/hqdefault.jpg',
  category: 'Summit Highlights',
  size: 'medium',
  youtubeId: 'F-Bdnokp8u8',
  platform: 'EmpowaEntrepreneurs™'
}, {
  id: 'v29',
  title: 'EmpowaWomen Leadership Summit Experience Reel 2025',
  subtitle: 'EmpowaWomen Highlights',
  duration: '3:45',
  date: 'August 2025',
  thumbnail: 'https://img.youtube.com/vi/s_RGYF3-fO4/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'medium',
  youtubeId: 's_RGYF3-fO4',
  platform: 'EmpowaWomen™'
}, {
  id: 'v30',
  title: 'EmpowaWomen Leadership Summit 2025 Highlights',
  subtitle: 'EmpowaWomen Highlights',
  duration: '2:30',
  date: 'August 2025',
  thumbnail: 'https://img.youtube.com/vi/w5p9v_9Htes/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'small',
  youtubeId: 'w5p9v_9Htes',
  platform: 'EmpowaWomen™'
}, {
  id: 'v31',
  title: 'EmpowaWomen Bubbles & Nibbles - Highlight Reel 2025',
  subtitle: 'EmpowaWomen Highlights',
  duration: '3:15',
  date: 'August 2025',
  thumbnail: 'https://img.youtube.com/vi/2P_GtCkhS9Q/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'small',
  youtubeId: '2P_GtCkhS9Q',
  platform: 'EmpowaWomen™'
}, {
  id: 'v32',
  title: 'EmpowaWomen Leadership Summit 2025',
  subtitle: 'EmpowaWomen Highlights',
  duration: '4:50',
  date: 'August 2025',
  thumbnail: 'https://img.youtube.com/vi/AeodFhnuUyQ/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'medium',
  youtubeId: 'AeodFhnuUyQ',
  platform: 'EmpowaWomen™'
}, {
  id: 'v33',
  title: 'EmpowaWomen Experience Video 2024',
  subtitle: 'EmpowaWomen Highlights',
  duration: '3:00',
  date: 'August 2024',
  thumbnail: 'https://img.youtube.com/vi/TpAM47m8v2E/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'small',
  youtubeId: 'TpAM47m8v2E',
  platform: 'EmpowaWomen™'
}, {
  id: 'v34',
  title: 'EmpowaWomen Annual Leadership Summit 26 August 2023',
  subtitle: 'EmpowaWomen Highlights',
  duration: '4:15',
  date: '26 August 2023',
  thumbnail: 'https://img.youtube.com/vi/rJ3_6lnOPcI/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'medium',
  youtubeId: 'rJ3_6lnOPcI',
  platform: 'EmpowaWomen™'
}, {
  id: 'v35',
  title: "Lincoln Mali - Lesaka Technologies CEO | Author of 'Blazing A Trial' on The Speakers Firm",
  subtitle: 'The Speakers Firm Highlights',
  duration: '4:30',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/KaDKu8ChKYs/hqdefault.jpg',
  category: 'Speaker Bureau',
  size: 'medium',
  youtubeId: 'KaDKu8ChKYs',
  platform: 'The Speakers Firm™'
}, {
  id: 'v36',
  title: "Lincoln Mali - Lesaka Technologies CEO | Author of 'Blazing A Trial' Extended",
  subtitle: 'The Speakers Firm Highlights',
  duration: '5:15',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/bjcHrXaccTY/hqdefault.jpg',
  category: 'Speaker Bureau',
  size: 'small',
  youtubeId: 'bjcHrXaccTY',
  platform: 'The Speakers Firm™'
}, {
  id: 'v37',
  title: "Mteto Nyati - Chairman of Eskom at the 'Blazing A Trail' Book Roundtable",
  subtitle: 'The Speakers Firm Highlights',
  duration: '3:40',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/9GQaaOlowW0/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'medium',
  youtubeId: '9GQaaOlowW0',
  platform: 'The Speakers Firm™'
}, {
  id: 'v38',
  title: "Official Experience Reel | 'Blazing a Trail' Exclusive Book Roundtable 2025",
  subtitle: 'The Speakers Firm Highlights',
  duration: '2:15',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/UcACoBam75o/hqdefault.jpg',
  category: 'Speaker Bureau',
  size: 'medium',
  youtubeId: 'UcACoBam75o',
  platform: 'The Speakers Firm™'
}, {
  id: 'v39',
  title: "‘Coming in From the Cold - An Autobiography’ by Prof Bonang Mohale Book Launch",
  subtitle: 'The Speakers Firm Highlights',
  duration: '3:50',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/O6_1XH3MMcE/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'small',
  youtubeId: 'O6_1XH3MMcE',
  platform: 'The Speakers Firm™'
}, {
  id: 'v40',
  title: 'Tebogo Mekgoe - EmpowaGrowth Workshop | Business Model Innovation Through Systemic Alignment',
  subtitle: 'The Speakers Firm Highlights',
  duration: '4:10',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/dn4DuJtt7mI/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'small',
  youtubeId: 'dn4DuJtt7mI',
  platform: 'The Speakers Firm™'
}, {
  id: 'v41',
  title: "Mary Bomela | CEO and Director of Companies at TUT’s IFOW 4th Annual Dialogue",
  subtitle: 'The Speakers Firm Highlights',
  duration: '3:20',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/INOSSwpIlv8/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'medium',
  youtubeId: 'INOSSwpIlv8',
  platform: 'The Speakers Firm™'
}, {
  id: 'v42',
  title: 'Prof Bonang Mohale | 4th Annual TUT Future of Work Dialogue',
  subtitle: 'The Speakers Firm Highlights',
  duration: '4:05',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/2s5CXK-w0AQ/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'small',
  youtubeId: '2s5CXK-w0AQ',
  platform: 'The Speakers Firm™'
}, {
  id: 'v43',
  title: 'The 2025 Book Roundtable Series - Dr Reuel Khoza | Legacy Beyond Leadership',
  subtitle: 'The Speakers Firm Highlights',
  duration: '3:35',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/0ij-23dNHvM/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'medium',
  youtubeId: '0ij-23dNHvM',
  platform: 'The Speakers Firm™'
}, {
  id: 'v44',
  title: 'The 2025 Book Roundtable Series - Dr Reuel Khoza | Prof Mervyn King',
  subtitle: 'The Speakers Firm Highlights',
  duration: '4:20',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/vCOArqmtLXk/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'medium',
  youtubeId: 'vCOArqmtLXk',
  platform: 'The Speakers Firm™'
}, {
  id: 'v45',
  title: 'Mary Bomela | CEO and Director of Companies - TUT’s IFOW 4th Annual Dialogue',
  subtitle: 'The Speakers Firm Highlights',
  duration: '3:40',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/Q-k4EaYuH_M/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'small',
  youtubeId: 'Q-k4EaYuH_M',
  platform: 'The Speakers Firm™'
}, {
  id: 'v46',
  title: 'Zola Mbatha - Orange Farm EmpowaMen Experience',
  subtitle: 'The Speakers Firm Highlights',
  duration: '2:55',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/yA5_vrN2vM0/hqdefault.jpg',
  category: 'Speaker Bureau',
  size: 'small',
  youtubeId: 'yA5_vrN2vM0',
  platform: 'The Speakers Firm™'
}, {
  id: 'v47',
  title: 'Dr Bonisile John Kani OIS OBE',
  subtitle: 'The Speakers Firm Highlights',
  duration: '4:50',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/4pwj3RCt2RI/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'medium',
  youtubeId: '4pwj3RCt2RI',
  platform: 'The Speakers Firm™'
}, {
  id: 'v48',
  title: 'Professor Bonang Mohale - Transnet',
  subtitle: 'The Speakers Firm Highlights',
  duration: '3:10',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/z20ciVNtc8A/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'small',
  youtubeId: 'z20ciVNtc8A',
  platform: 'The Speakers Firm™'
}, {
  id: 'v49',
  title: 'Muzi Kuzwayo - Orange Farm EmpowaMen Programme',
  subtitle: 'The Speakers Firm Highlights',
  duration: '3:35',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/3xJJ0IQQFCw/hqdefault.jpg',
  category: 'Speaker Bureau',
  size: 'small',
  youtubeId: '3xJJ0IQQFCw',
  platform: 'The Speakers Firm™'
}, {
  id: 'v50',
  title: 'Bonang Mohale - Orange Farm EmpowaMen Programme',
  subtitle: 'The Speakers Firm Highlights',
  duration: '4:00',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/Txr0O_M6bb0/hqdefault.jpg',
  category: 'Speaker Bureau',
  size: 'medium',
  youtubeId: 'Txr0O_M6bb0',
  platform: 'The Speakers Firm™'
}, {
  id: 'v51',
  title: 'Experience Reel - Orange Farm EmpowaMen Programme',
  subtitle: 'The Speakers Firm Highlights',
  duration: '2:45',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/tZ-ick_bEGw/hqdefault.jpg',
  category: 'Speaker Bureau',
  size: 'small',
  youtubeId: 'tZ-ick_bEGw',
  platform: 'The Speakers Firm™'
}, {
  id: 'v52',
  title: 'Prof Maurice Radebe - Head & Director: Wits Business School(WBS)',
  subtitle: 'The Speakers Firm Highlights',
  duration: '4:15',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/7iUZ-E1OZ0U/hqdefault.jpg',
  category: 'Thought Leadership',
  size: 'medium',
  youtubeId: '7iUZ-E1OZ0U',
  platform: 'The Speakers Firm™'
}, {
  id: 'v53',
  title: 'Ekurhuleni EmpowaYouth - Day One',
  subtitle: 'Ekurhuleni EmpowaYouth Highlights',
  duration: '3:10',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/Qldd76QdZIA/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'medium',
  youtubeId: 'Qldd76QdZIA',
  platform: 'EmpowaYouth™'
}, {
  id: 'v54',
  title: 'Ekurhuleni EmpowaYouth - Day Two',
  subtitle: 'Ekurhuleni EmpowaYouth Highlights',
  duration: '2:45',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/AeNPV5cBrqM/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'small',
  youtubeId: 'AeNPV5cBrqM',
  platform: 'EmpowaYouth™'
}, {
  id: 'v55',
  title: 'Ekurhuleni EmpowaYouth - Day Three',
  subtitle: 'Ekurhuleni EmpowaYouth Highlights',
  duration: '3:00',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/RvjJvng2jdk/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'small',
  youtubeId: 'RvjJvng2jdk',
  platform: 'EmpowaYouth™'
}, {
  id: 'v56',
  title: 'Ekurhuleni EmpowaYouth - Full Version',
  subtitle: 'Ekurhuleni EmpowaYouth Highlights',
  duration: '4:50',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/t_D0YtTAjC0/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'medium',
  youtubeId: 't_D0YtTAjC0',
  platform: 'EmpowaYouth™'
}, {
  id: 'v57',
  title: '#Backchat with Minister Buti Manamela at EmpowaWorx Headquarters',
  subtitle: 'EmpowaYouth Highlights',
  duration: '4:05',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/qkH8TtUpqTc/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'medium',
  youtubeId: 'qkH8TtUpqTc',
  platform: 'EmpowaYouth™'
}, {
  id: 'v58',
  title: 'EmpowaYouth Week Vaal 2026 - PART A Promotion',
  subtitle: 'Vaal EmpowaYouth Week Highlights',
  duration: '2:15',
  date: '2026',
  thumbnail: 'https://img.youtube.com/vi/K_JTdQ0omcI/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'small',
  youtubeId: 'K_JTdQ0omcI',
  platform: 'EmpowaYouth™'
}, {
  id: 'v59',
  title: 'EmpowaYouth Week Vaal - PART B Promotional Video',
  subtitle: 'Vaal EmpowaYouth Week Highlights',
  duration: '2:30',
  date: '2026',
  thumbnail: 'https://img.youtube.com/vi/ZgXBcNQhHLA/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'small',
  youtubeId: 'ZgXBcNQhHLA',
  platform: 'EmpowaYouth™'
}, {
  id: 'v60',
  title: 'Vaal EmpowaYouth Pastoral Breakfast Invitation 2026',
  subtitle: 'Vaal EmpowaYouth Week Highlights',
  duration: '3:20',
  date: '2026',
  thumbnail: 'https://img.youtube.com/vi/KEG2Ffv6PhI/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'medium',
  youtubeId: 'KEG2Ffv6PhI',
  platform: 'EmpowaYouth™'
}, {
  id: 'v61',
  title: 'Tebogo Mekgoe - EmpowaGrowth Workshop | Business Model Innovation Through Systemic Alignment',
  subtitle: 'EmpowaGrowth Highlights',
  duration: '4:10',
  date: '2024',
  thumbnail: 'https://img.youtube.com/vi/dn4DuJtt7mI/hqdefault.jpg',
  category: 'Strategic Growth',
  size: 'medium',
  youtubeId: 'dn4DuJtt7mI',
  platform: 'EmpowaGrowth™'
}, {
  id: 'v62',
  title: 'Gogo Dineo Ndlanzi',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:30',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/nHA1LZj2CJ4/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'nHA1LZj2CJ4',
  platform: 'EmpowaMen™'
}, {
  id: 'v63',
  title: 'Dr Victor Ramathesele',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:15',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/_HrVZcb_wts/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: '_HrVZcb_wts',
  platform: 'EmpowaMen™'
}, {
  id: 'v64',
  title: 'Dr David Molapo',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:50',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/z3Fas4VQvzw/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'z3Fas4VQvzw',
  platform: 'EmpowaMen™'
}, {
  id: 'v65',
  title: 'Dr Shimmy Kotu',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:10',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/YlSsxtaqaeA/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'YlSsxtaqaeA',
  platform: 'EmpowaMen™'
}, {
  id: 'v66',
  title: 'Thulani Gcabashe',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:45',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/OEUxgnMmQjI/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'OEUxgnMmQjI',
  platform: 'EmpowaMen™'
}, {
  id: 'v67',
  title: 'Siya Khumalo',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:20',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/jKQtj-FAafE/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'jKQtj-FAafE',
  platform: 'EmpowaMen™'
}, {
  id: 'v68',
  title: 'Sibusiso Ngwalwa',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:05',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/ku3Gqs5rnnA/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'ku3Gqs5rnnA',
  platform: 'EmpowaMen™'
}, {
  id: 'v69',
  title: 'Sazini Mojapelo',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:15',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/OKHIDOJvjUo/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'OKHIDOJvjUo',
  platform: 'EmpowaMen™'
}, {
  id: 'v70',
  title: 'Sechaba Motsieloa',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:35',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/mAcePL62oCE/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'mAcePL62oCE',
  platform: 'EmpowaMen™'
}, {
  id: 'v71',
  title: 'Pastor Siyabonga Sekuthi',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:30',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/b-5l7LwKnFA/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'b-5l7LwKnFA',
  platform: 'EmpowaMen™'
}, {
  id: 'v72',
  title: 'Paul Nzimande',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:10',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/UNYaYpsIOBA/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'UNYaYpsIOBA',
  platform: 'EmpowaMen™'
}, {
  id: 'v73',
  title: 'Muzi Kuzwayo',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:40',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/8oOiUOdcJXY/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: '8oOiUOdcJXY',
  platform: 'EmpowaMen™'
}, {
  id: 'v74',
  title: 'Milton Nkosi',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:20',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/43fTXIcLXto/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: '43fTXIcLXto',
  platform: 'EmpowaMen™'
}, {
  id: 'v75',
  title: 'Max Kaan',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:05',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/LoY3g-26kV8/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'LoY3g-26kV8',
  platform: 'EmpowaMen™'
}, {
  id: 'v76',
  title: 'Martin Manamela',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:55',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/jJpV0UhsWRY/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'jJpV0UhsWRY',
  platform: 'EmpowaMen™'
}, {
  id: 'v77',
  title: 'Martin Pelders',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:20',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/jQTN3WJhLNE/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'jQTN3WJhLNE',
  platform: 'EmpowaMen™'
}, {
  id: 'v78',
  title: 'Leslie Sedibe',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:10',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/cQqxPXIFWrM/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'cQqxPXIFWrM',
  platform: 'EmpowaMen™'
}, {
  id: 'v79',
  title: 'Joshua Maponga',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:45',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/UA6139spfBc/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'UA6139spfBc',
  platform: 'EmpowaMen™'
}, {
  id: 'v80',
  title: 'Dr Bonisile John Kani',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:30',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/SP9p-xiFeKc/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'SP9p-xiFeKc',
  platform: 'EmpowaMen™'
}, {
  id: 'v81',
  title: 'Ivan Morake',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:15',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/jNpdHlI2_9s/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'jNpdHlI2_9s',
  platform: 'EmpowaMen™'
}, {
  id: 'v82',
  title: 'Isaac Gampu',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:30',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/D9YJ2Lp55yo/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'D9YJ2Lp55yo',
  platform: 'EmpowaMen™'
}, {
  id: 'v83',
  title: 'Happy Ntshingila',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:05',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/O-FCFsWAfPw/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'O-FCFsWAfPw',
  platform: 'EmpowaMen™'
}, {
  id: 'v84',
  title: 'Hakeem Lesolang',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:50',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/ZKL1eWarDSE/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'ZKL1eWarDSE',
  platform: 'EmpowaMen™'
}, {
  id: 'v85',
  title: 'Joshua Maponga (Part 2)',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:00',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/ShdErxa5mKY/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'ShdErxa5mKY',
  platform: 'EmpowaMen™'
}, {
  id: 'v86',
  title: 'Abner Mariri',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:10',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/6KM4vwGASrE/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: '6KM4vwGASrE',
  platform: 'EmpowaMen™'
}, {
  id: 'v87',
  title: 'Dr Gugulethu Xaba',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:20',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/RRMdCkadEkI/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'RRMdCkadEkI',
  platform: 'EmpowaMen™'
}, {
  id: 'v88',
  title: 'Dr Jerry Gule',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:40',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/7EP-Ym81wQg/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: '7EP-Ym81wQg',
  platform: 'EmpowaMen™'
}, {
  id: 'v89',
  title: 'Mbuyiselo Botha',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:25',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/chaKcfExpso/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: 'chaKcfExpso',
  platform: 'EmpowaMen™'
}, {
  id: 'v90',
  title: 'Bongani Luvalo',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:15',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/BbFDSQ3K_9Y/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'BbFDSQ3K_9Y',
  platform: 'EmpowaMen™'
}, {
  id: 'v91',
  title: 'Dr Anele Siswana',
  subtitle: 'EmpowaMen Highlights',
  duration: '3:55',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/3P2uVID3GQw/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'small',
  youtubeId: '3P2uVID3GQw',
  platform: 'EmpowaMen™'
}, {
  id: 'v92',
  title: 'Dr Aaron Lechuti',
  subtitle: 'EmpowaMen Highlights',
  duration: '4:00',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/jvAnDjm9lo0/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'jvAnDjm9lo0',
  platform: 'EmpowaMen™'
}, {
  id: 'v93',
  title: 'EmpowaMen Experience',
  subtitle: 'EmpowaMen Highlights',
  duration: '2:40',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/uum59-_nA5U/hqdefault.jpg',
  category: 'Men Leadership',
  size: 'medium',
  youtubeId: 'uum59-_nA5U',
  platform: 'EmpowaMen™'
}, {
  id: 'v94',
  title: 'Inaugural EmpowaWoman in Health and Wellness Leadership Summit 2018 - Highlights',
  subtitle: 'EmpowaWomen Highlights',
  duration: '3:50',
  date: '2018',
  thumbnail: 'https://img.youtube.com/vi/4UZDTF7bMZ0/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'medium',
  youtubeId: '4UZDTF7bMZ0',
  platform: 'EmpowaWomen™'
}, {
  id: 'v95',
  title: 'EmpowaWoman in Oil & Gas Leadership Summit 2018 | Highlights',
  subtitle: 'EmpowaWomen Highlights',
  duration: '4:15',
  date: '2018',
  thumbnail: 'https://img.youtube.com/vi/fdfTfJkl5zo/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'small',
  youtubeId: 'fdfTfJkl5zo',
  platform: 'EmpowaWomen™'
}, {
  id: 'v96',
  title: 'Women in Health and Wellness Summit: Framing mind and body as one',
  subtitle: 'EmpowaWomen Highlights',
  duration: '3:00',
  date: '2018',
  thumbnail: 'https://img.youtube.com/vi/VMfOcb7a3rk/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'small',
  youtubeId: 'VMfOcb7a3rk',
  platform: 'EmpowaWomen™'
}, {
  id: 'v97',
  title: 'TETA EmpowaWoman In Transport Leadership Summit 2017',
  subtitle: 'EmpowaWomen Highlights',
  duration: '4:45',
  date: '2017',
  thumbnail: 'https://img.youtube.com/vi/3O-dyUaAXwI/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'medium',
  youtubeId: '3O-dyUaAXwI',
  platform: 'EmpowaWomen™'
}, {
  id: 'v98',
  title: 'EmpowaWomen in Transport: creating access for women in the sector',
  subtitle: 'EmpowaWomen Highlights',
  duration: '3:25',
  date: '2017',
  thumbnail: 'https://img.youtube.com/vi/nVsGsjuzOdU/hqdefault.jpg',
  category: 'Women Leadership',
  size: 'small',
  youtubeId: 'nVsGsjuzOdU',
  platform: 'EmpowaWomen™'
}, {
  id: 'v99',
  title: 'TETA | National Campaign Delivery',
  subtitle: 'EmpowaYouth Highlights',
  duration: '3:45',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/ypgJ1qmThUo/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'medium',
  youtubeId: 'ypgJ1qmThUo',
  platform: 'EmpowaYouth™'
}, {
  id: 'v100',
  title: 'Black Brain & Gauteng Film Commission | Youth in Film',
  subtitle: 'EmpowaYouth Highlights',
  duration: '4:20',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/Uhc8OpyqpTM/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'medium',
  youtubeId: 'Uhc8OpyqpTM',
  platform: 'EmpowaYouth™'
}, {
  id: 'v101',
  title: 'EmpowaYouth Week | Orange Farm',
  subtitle: 'EmpowaYouth Highlights',
  duration: '3:10',
  date: '2025',
  thumbnail: 'https://img.youtube.com/vi/eUmVWtQwKd0/hqdefault.jpg',
  category: 'Youth Economy',
  size: 'medium',
  youtubeId: 'eUmVWtQwKd0',
  platform: 'EmpowaYouth™'
}];

// ─── Hero & constants ─────────────────────────────────────────────────────────

const HERO_LINE_1 = ['Media', '/', 'Gallery'];
const HERO_LINE_2 = ['And', 'Impact'];
const EASE_SMOOTH = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrollY() {
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener('scroll', handler, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return y;
}

// ─── FadeSlideUp ─────────────────────────────────────────────────────────────

const FadeSlideUp = ({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.15
  });
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 40
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 40
  }} transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
    delay
  }} className={className}>
    {children}
  </motion.div>;
};

// ─── AfricaWatermark ─────────────────────────────────────────────────────────





// ─── HERO ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const scrollY = useScrollY();
  const heroParallaxY = scrollY * 0.35;
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setInView(true), 200);
    return () => clearTimeout(t);
  }, []);
  const S = (delay: number = 0): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(30px)',
    transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
  });
  const line1Count = HERO_LINE_1.length;
  return <section style={{
    position: 'relative',
    width: '100%',
    minHeight: '80vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    background: DARK
  }}>
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: '-20%',
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      <img src="/Honoring-Dr-John-Kani-8.jpg" alt="" style={{
        width: '100%',
        height: '140%',
        objectFit: 'cover',
        objectPosition: 'center 50%',
        display: 'block',
        filter: 'grayscale(1) brightness(0.45)',
        transform: `translateY(${heroParallaxY}px)`,
        willChange: 'transform'
      }} />
    </div>
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.72) 45%, rgba(13,13,13,0.20) 100%)',
      pointerEvents: 'none'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(13,13,13,0.50) 0%, rgba(13,13,13,0.15) 40%, rgba(13,13,13,0.82) 100%)',
      pointerEvents: 'none'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.15) 0%, transparent 55%)',
      pointerEvents: 'none'
    }} />

    <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-28 sm:pt-36 md:pt-52 lg:pt-60 pb-20 md:pb-24 lg:pb-28" style={{
      zIndex: 10
    }}>
      <div className="mb-6 md:mb-10" style={S(100)}>
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-5">
          <div style={{
            width: '4px',
            height: '40px',
            background: RED,
            borderRadius: '2px',
            flexShrink: 0,
            marginTop: '2px'
          }} />
          <p className="text-sm sm:text-base md:text-lg font-medium text-white/70 leading-snug tracking-tight max-w-[500px]">
            <span>Stories, moments and milestones from across the EmpowaWorx™ ecosystem.</span>
          </p>
        </div>
      </div>

      <h1 className="text-[clamp(32px,7vw,143px)] font-semibold text-white leading-[0.95] tracking-[-0.06em] flex flex-wrap gap-x-[0.18em] mb-1 capitalize">
        {HERO_LINE_1.map((word, i) => <span key={`l1-${word}-${i}`} style={{
          display: 'inline-block',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms`
        }}>
          {word}
        </span>)}
      </h1>

      <h1 className="text-[clamp(32px,7vw,143px)] font-semibold leading-[0.95] tracking-[-0.06em] flex flex-wrap gap-x-[0.18em] mb-8 md:mb-14 capitalize">
        {HERO_LINE_2.map((word, i) => {
          const globalIdx = line1Count + i;
          const isLast = i === HERO_LINE_2.length - 1;
          return <span key={`l2-${word}-${i}`} style={{
            display: 'inline-block',
            color: isLast ? RED : WHITE,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${globalIdx * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${globalIdx * 80}ms`
          }}>
            {word}
          </span>;
        })}
      </h1>

      {/* CTA buttons — stack vertically on mobile, row on sm+ */}
      <div className="flex flex-wrap items-center gap-4">
        <a href="#press-media" className="cta-primary group h-[56px] min-w-[180px] md:min-w-[200px]">
          <span>Featured News</span>
          <div className="cta-icon-container">
            <ArrowUpRight size={14} className="text-[#1E1E1E]" />
          </div>
        </a>
        <a href="#events-gallery" className="cta-secondary group h-[56px] min-w-[160px] md:min-w-[180px]">
          <span>View Gallery</span>
        </a>
      </div>

      {/* Bottom bar — positioned relative to section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: '0.75rem 1rem',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <p className="text-white/50 font-medium text-[11px] uppercase tracking-[0.18em]">
          <span>Media &amp; Gallery</span>
        </p>
        <p className="text-[#FC3637] font-bold text-[11px] uppercase tracking-[0.18em] hidden sm:block">
          <span>100% Black-Owned</span>
        </p>
      </div>
    </div>
  </section>;
};

// ─── EVENTS GALLERY SECTION ───────────────────────────────────────────────────

const EventImageGrid = ({
  images,
  onImageClick
}: {
  images: EventImage[];
  onImageClick: (img: EventImage, allImages: EventImage[]) => void;
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const INITIAL_COUNT = 6;
  const visibleImages = showAll ? images : images.slice(0, INITIAL_COUNT);

  const width = useWindowWidth();
  const colsCount = width >= 1024 ? 3 : width >= 640 ? 2 : 1;

  const columns = React.useMemo(() => {
    const cols: EventImage[][] = Array.from({ length: colsCount }, () => []);
    visibleImages.forEach((item, index) => {
      cols[index % colsCount].push(item);
    });
    return cols;
  }, [visibleImages, colsCount]);

  return <div className="flex flex-col gap-8 w-full">
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${colsCount}, 1fr)`
      }}
    >
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {col.map((img, idx) => (
              <motion.div
                layout
                key={img.id}
                onClick={() => onImageClick(img, images)}
                className="relative overflow-hidden cursor-pointer group rounded-[2px] border border-white/5"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.04
                }}
                style={{
                  background: '#181818',
                  display: 'block',
                  width: '100%'
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-contain block transition-transform duration-700 group-hover:scale-104"
                />
                <div
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                  style={{
                    background: 'linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.40) 55%, rgba(13,13,13,0.05) 100%)',
                  }}
                >
                  <p style={{
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.4,
                    margin: 0
                  }}>
                    {img.caption}
                  </p>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '6px',
                    color: 'rgba(255,255,255,0.40)',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase'
                  }}>
                    <MapPin size={9} style={{
                      color: RED,
                      flexShrink: 0
                    }} />
                    <span>{img.location}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>

    {images.length > INITIAL_COUNT && (
      <div className="flex justify-center mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowAll(!showAll);
          }}
          style={{
            background: 'transparent',
            border: `1px solid ${RED}`,
            color: '#FFFFFF',
            padding: '12px 28px',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            cursor: 'pointer',
            borderRadius: '9999px',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = RED;
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(252, 54, 55, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {showAll ? 'Show Less' : `Show More (${images.length - INITIAL_COUNT} more)`}
        </button>
      </div>
    )}
  </div>;
};
const EventAccordionItem = ({
  group,
  isOpen,
  onToggle,
  index,
  onImageClick
}: {
  group: EventGroup;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  onImageClick: (img: EventImage, allImages: EventImage[]) => void;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1
  });
  React.useEffect(() => {
    if (isOpen && ref.current) {
      const timer = setTimeout(() => {
        const headerOffset = 90; // Offset to clear the sticky header height + some spacing
        const elementPosition = ref.current?.getBoundingClientRect().top ?? 0;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 28
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 28
  }} transition={{
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
    delay: index * 0.08
  }} style={{
    borderTop: '1px solid rgba(255,255,255,0.08)'
  }} className={`group/accordion-item accordion-item-dark ${isOpen ? 'is-open' : ''}`}>
    <button onClick={onToggle} className="accordion-btn" aria-expanded={isOpen}>
      <div style={{
        flex: 1,
        minWidth: 0
      }}>
        <span style={{
          display: 'block',
          color: RED,
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginBottom: '8px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {group.eyebrow}
        </span>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: '12px',
          marginBottom: '6px'
        }}>
          <h3 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(18px, 3.5vw, 48px)',
            fontWeight: 800,
            color: WHITE,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            margin: 0,
            textTransform: 'none',
            wordBreak: 'break-word'
          }}>
            {group.title}
          </h3>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.30)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}>
            {group.date}
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'rgba(255,255,255,0.38)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          flexWrap: 'wrap'
        }}>
          <MapPin size={10} style={{
            color: RED,
            flexShrink: 0
          }} />
          <span>{group.location}</span>
        </div>
      </div>
      <div style={{
        width: '36px',
        height: '36px',
        border: `1px solid ${isOpen ? RED : 'rgba(255,255,255,0.15)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'border-color 0.25s ease',
        marginTop: '2px'
      }} className="accordion-chevron-wrap">
        <ChevronDown size={16} style={{
          color: isOpen ? RED : 'rgba(255,255,255,0.50)',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), color 0.25s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }} />
      </div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && <motion.div key="content" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3
      }}>
        <div className="accordion-content-inner">
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '14px',
            lineHeight: 1.75,
            letterSpacing: '-0.01em',
            maxWidth: '600px',
            marginBottom: '24px'
          }}>
            {group.description}
          </p>
          <EventImageGrid images={group.images} onImageClick={onImageClick} />
        </div>
      </motion.div>}
    </AnimatePresence>
  </motion.div>;
};
const EventsGallerySection = ({ items, renderPills }: { items: EventGroup[]; renderPills: () => React.ReactNode }) => {
  const [openId, setOpenId] = React.useState<string>('');
  const [activeImage, setActiveImage] = React.useState<EventImage | null>(null);
  const [lightboxImages, setLightboxImages] = React.useState<EventImage[]>([]);

  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.05
  });

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeImage || lightboxImages.length === 0) return;
    const currentIndex = lightboxImages.findIndex(img => img.id === activeImage.id);
    const prevIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    setActiveImage(lightboxImages[prevIndex]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeImage || lightboxImages.length === 0) return;
    const currentIndex = lightboxImages.findIndex(img => img.id === activeImage.id);
    const nextIndex = (currentIndex + 1) % lightboxImages.length;
    setActiveImage(lightboxImages[nextIndex]);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeImage) return;
      if (e.key === 'Escape') setActiveImage(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, lightboxImages]);

  const handleImageClick = (img: EventImage, allImages: EventImage[]) => {
    setActiveImage(img);
    setLightboxImages(allImages);
  };

  return <section ref={sectionRef} id="events-gallery" style={{
    background: DARK,
    width: '100%',
    paddingTop: 'clamp(56px, 8vw, 120px)',
    paddingBottom: 'clamp(56px, 8vw, 120px)'
  }}>
    <div style={{
      maxWidth: '1600px',
      margin: '0 auto',
      paddingLeft: 'clamp(16px, 4vw, 96px)',
      paddingRight: 'clamp(16px, 4vw, 96px)'
    }}>
      {/* Section header */}
      <motion.div initial={{
        opacity: 0,
        y: 32
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 32
      }} transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1]
      }} style={{
        marginBottom: 'clamp(40px, 7vw, 96px)'
      }}>
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8">
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Events Gallery</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1] tracking-[-0.04em]">
              <span style={{
                display: 'block'
              }}>Moments</span>
              <span style={{
                display: 'block',
                color: RED
              }}>That Matter</span>
            </h2>
          </div>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.40)',
            letterSpacing: '-0.01em',
            maxWidth: '360px'
          }} className="text-right hidden sm:block">
            Explore each event below — click to expand the gallery for that occasion.
          </p>
        </div>
        {renderPills()}
      </motion.div>

      {/* Accordion of event groups */}
      {items.length === 0 ? (
        <div style={{
          padding: '80px 24px',
          textAlign: 'center',
          border: '1px dashed rgba(255, 255, 255, 0.12)',
          background: 'rgba(255, 255, 255, 0.01)',
          color: 'rgba(255, 255, 255, 0.35)',
          fontFamily: 'Inter, sans-serif'
        }}>
          <p style={{ fontSize: '15px', fontWeight: 500, margin: 0, letterSpacing: '0.02em' }}>
            No event gallery moments uploaded for this platform yet. Check back soon!
          </p>
        </div>
      ) : (
        <div>
          {items.map((group, idx) => <EventAccordionItem key={group.id} group={group} isOpen={openId === group.id} onToggle={() => setOpenId(openId === group.id ? '' : group.id)} index={idx} onImageClick={handleImageClick} />)}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }} />
        </div>
      )}

      {/* Bottom rule */}
      <motion.div initial={{
        opacity: 0,
        scaleX: 0
      }} animate={isInView ? {
        opacity: 1,
        scaleX: 1
      } : {
        opacity: 0,
        scaleX: 0
      }} transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5
      }} style={{
        marginTop: 'clamp(40px, 6vw, 72px)',
        height: '1px',
        background: 'linear-gradient(to right, #FC3637 0%, rgba(252,54,55,0.30) 40%, rgba(252,54,55,0) 100%)',
        transformOrigin: 'left'
      }} />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveImage(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255,255,255,0.06)',
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'}
            >
              <X size={20} />
            </button>

            {/* Navigation Controls */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Prev button */}
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '0',
                  background: 'rgba(255,255,255,0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                  zIndex: 10,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'}
              >
                <ChevronLeft size={24} />
              </button>

              {/* Main Image container */}
              <motion.div
                key={activeImage.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: 'calc(100% - 120px)',
                  maxHeight: '80vh'
                }}
              >
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                />
                {/* Image Info */}
                <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '600px' }}>
                  <p style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>
                    {activeImage.caption}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'rgba(255,255,255,0.40)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <MapPin size={11} style={{ color: RED }} />
                    <span>{activeImage.location}</span>
                  </div>
                </div>
              </motion.div>

              {/* Next button */}
              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '0',
                  background: 'rgba(255,255,255,0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                  zIndex: 10,
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </section>;
};

// ─── PRESS & MEDIA SECTION ────────────────────────────────────────────────────

const PressMediaSection = ({ items, renderPills }: { items: PressArticle[]; renderPills: () => React.ReactNode }) => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.08
  });
  const featured = items.find(a => a.featured) || items[0];
  const rest = featured ? items.filter(a => a.id !== featured.id) : [];

  return <section id="press-media" ref={sectionRef} style={{
    background: WHITE,
    width: '100%',
    paddingTop: 'clamp(56px, 8vw, 120px)',
    paddingBottom: 'clamp(56px, 8vw, 120px)'
  }}>
    <div style={{
      maxWidth: '1600px',
      margin: '0 auto',
      paddingLeft: 'clamp(16px, 4vw, 96px)',
      paddingRight: 'clamp(16px, 4vw, 96px)'
    }}>
      {/* Section header */}
      <motion.div initial={{
        opacity: 0,
        y: 24
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 24
      }} transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }} style={{
        marginBottom: 'clamp(36px, 6vw, 80px)'
      }}>
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8">
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Press &amp; Media</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-[1] tracking-[-0.04em]">
              <span style={{
                display: 'block'
              }}>In The</span>
              <span style={{
                display: 'block',
                color: RED
              }}>News</span>
            </h2>
          </div>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.75,
            color: 'rgba(30,30,30,0.50)',
            letterSpacing: '-0.01em',
            maxWidth: '380px'
          }} className="text-right hidden sm:block">
            Press coverage, thought leadership pieces, and award announcements from across the continent.
          </p>
        </div>
        {renderPills()}
      </motion.div>

      {items.length === 0 ? (
        <div style={{
          padding: '80px 24px',
          textAlign: 'center',
          border: '1px dashed rgba(30,30,30,0.15)',
          borderRadius: '4px',
          color: 'rgba(30,30,30,0.45)',
          fontFamily: 'Inter, sans-serif'
        }}>
          <p style={{ fontSize: '15px', fontWeight: 500, margin: 0, letterSpacing: '0.02em' }}>
            No press coverage or news articles for this platform yet. Check back soon!
          </p>
        </div>
      ) : (
        <>
          {/* Featured article — stacks on mobile, row on md+ */}
          {featured && (
            <motion.a href={featured.url || "#"} target={featured.url ? "_blank" : undefined} rel={featured.url ? "noopener noreferrer" : undefined} className="featured-article news-card group" initial={{
              opacity: 0,
              y: 32
            }} animate={isInView ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 32
            }} transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1
            }} style={{
              textDecoration: 'none'
            }}>
              <div className="featured-article-image">
                <img src={featured.image} alt={featured.title} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)'
                }} className="group-hover:scale-105" />
              </div>
              <div className="featured-article-content">
                <div style={{
                  marginBottom: '16px'
                }}>
                  <span style={{
                    background: RED,
                    color: WHITE,
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    display: 'inline-block'
                  }}>
                    {featured.category}
                  </span>
                </div>
                <h2 style={{
                  fontSize: 'clamp(18px, 2.5vw, 34px)',
                  fontWeight: 800,
                  color: '#1E1E1E',
                  lineHeight: 1.2,
                  letterSpacing: '-0.03em',
                  marginBottom: '14px',
                  transition: 'color 0.2s ease'
                }} className="group-hover:text-[#FC3637]">
                  {featured.title}
                </h2>
                <p style={{
                  color: 'rgba(30,30,30,0.55)',
                  fontSize: '15px',
                  lineHeight: 1.75,
                  marginBottom: '24px'
                }}>
                  {featured.excerpt}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '12px',
                    color: 'rgba(30,30,30,0.40)',
                    fontWeight: 500,
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <Calendar size={12} />
                      <span>{featured.date}</span>
                    </span>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <Clock size={12} />
                      <span>{featured.readTime}</span>
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: RED
                  }}>
                    <span>Read More</span>
                    <ChevronRight size={13} />
                  </div>
                </div>
              </div>
            </motion.a>
          )}

          {/* Article grid — 1 col mobile, 2 col tablet, 3 col desktop */}
          {rest.length > 0 && (
            <div className="press-grid">
              {rest.map((article, idx) => <motion.a key={article.id} href={article.url || "#"} target={article.url ? "_blank" : undefined} rel={article.url ? "noopener noreferrer" : undefined} className="news-card group" initial={{
                opacity: 0,
                y: 32
              }} animate={isInView ? {
                opacity: 1,
                y: 0
              } : {
                opacity: 0,
                y: 32
              }} transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15 + idx * 0.07
              }} style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                border: '1px solid rgba(30,30,30,0.08)',
                overflow: 'hidden',
                background: WHITE
              }}>
                <div style={{
                  overflow: 'hidden',
                  height: '200px'
                }}>
                  <img src={article.image} alt={article.title} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)'
                  }} className="group-hover:scale-105" />
                </div>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 'clamp(16px, 2.5vw, 32px)'
                }}>
                  <div style={{
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      color: RED,
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      borderLeft: `2px solid ${RED}`,
                      paddingLeft: '8px'
                    }}>
                      {article.category}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1E1E1E',
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    marginBottom: '10px',
                    flex: 1,
                    transition: 'color 0.2s ease'
                  }} className="group-hover:text-[#FC3637]">
                    {article.title}
                  </h3>
                  <p style={{
                    color: 'rgba(30,30,30,0.50)',
                    fontSize: '13px',
                    lineHeight: 1.7,
                    marginBottom: '16px'
                  }}>
                    {article.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(30,30,30,0.07)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '11px',
                      color: 'rgba(30,30,30,0.38)',
                      fontWeight: 500,
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Calendar size={11} />
                        <span>{article.date}</span>
                      </span>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Clock size={11} />
                        <span>{article.readTime}</span>
                      </span>
                    </div>
                    <ExternalLink size={13} style={{
                      color: RED,
                      opacity: 0,
                      transition: 'opacity 0.2s ease'
                    }} className="group-hover:opacity-100" />
                  </div>
                </div>
              </motion.a>)}
            </div>
          )}
        </>
      )}
    </div>
  </section>;
};

// ─── VIDEO INTERVIEWS SECTION ─────────────────────────────────────────────────

const VideoInterviewsSection = ({ items, renderPills }: { items: VideoItem[]; renderPills: () => React.ReactNode }) => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.06
  });
  const summitVideos = items.filter(v => v.youtubeId === 'u6CtE7u5Oys');
  const youthVideos = items.filter(v => v.youtubeId !== 'u6CtE7u5Oys');

  const [selectedVideo, setSelectedVideo] = React.useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(100);

  // If selectedVideo is not in the current items list, default to items[0]
  const currentMainVideo = selectedVideo && items.some(v => v.id === selectedVideo.id)
    ? selectedVideo
    : items[0];

  // Reset play state if the items list changes or if currentMainVideo becomes invalid
  React.useEffect(() => {
    setIsPlaying(false);
    setSelectedVideo(null);
    setVisibleCount(100);
  }, [items]);

  // Sort youth videos chronologically by Day (Day 1 to Day 5)
  const sortedYouthVideos = [...youthVideos].sort((a, b) => {
    const getDay = (title: string) => {
      const match = title.match(/Day\s+(\d+)/i);
      return match ? parseInt(match[1], 10) : 0;
    };
    return getDay(a.title) - getDay(b.title);
  });

  return <section id="video-interviews" ref={sectionRef} style={{
    background: DARK,
    width: '100%',
    paddingTop: 'clamp(56px, 8vw, 120px)',
    paddingBottom: 'clamp(56px, 8vw, 120px)'
  }}>
    <div style={{
      maxWidth: '1600px',
      margin: '0 auto',
      paddingLeft: 'clamp(16px, 4vw, 96px)',
      paddingRight: 'clamp(16px, 4vw, 96px)'
    }}>
      {/* Section header */}
      <motion.div initial={{
        opacity: 0,
        y: 32
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 32
      }} transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1]
      }} style={{
        marginBottom: 'clamp(36px, 6vw, 80px)'
      }}>
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8">
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Video Interviews</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1] tracking-[-0.04em]">
              <span style={{
                display: 'block'
              }}>Watch</span>
              <span style={{
                display: 'block',
                color: RED
              }}>&#38; Learn</span>
            </h2>
          </div>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.38)',
            letterSpacing: '-0.01em',
            maxWidth: '380px'
          }} className="text-right hidden sm:block">
            Keynotes, panel discussions, CEO interviews, and thought leadership conversations.
          </p>
        </div>
        {renderPills()}
      </motion.div>

      {items.length === 0 ? (
        <div style={{
          padding: '80px 24px',
          textAlign: 'center',
          border: '1px dashed rgba(255, 255, 255, 0.12)',
          background: 'rgba(255, 255, 255, 0.01)',
          color: 'rgba(255, 255, 255, 0.35)',
          fontFamily: 'Inter, sans-serif'
        }}>
          <p style={{ fontSize: '15px', fontWeight: 500, margin: 0, letterSpacing: '0.02em' }}>
            No video interviews uploaded for this platform yet. Check back soon!
          </p>
        </div>
      ) : (
        <>
          {items.length > 0 && (
            <div>
              {/* Main Featured Video */}
              {(() => {
                const mainVideo = currentMainVideo;
                const otherVideos = items.filter(v => v.id !== mainVideo.id);
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div
                        id="main-video-player"
                        className="video-item video-border-ring"
                        style={{
                          background: '#111',
                          position: 'relative',
                          display: 'block',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          width: '100%',
                          maxWidth: '1000px',
                          margin: '0 auto 24px',
                          cursor: isPlaying ? 'default' : 'pointer'
                        }}
                        onClick={!isPlaying ? () => setIsPlaying(true) : undefined}
                      >
                        {isPlaying ? (
                          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${mainVideo.youtubeId}?autoplay=1`}
                              title={mainVideo.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                border: 'none'
                              }}
                            />
                          </div>
                        ) : (
                          <>
                            <img
                              src={mainVideo.thumbnail}
                              alt={mainVideo.title}
                              style={{
                                width: '100%',
                                aspectRatio: '16/9',
                                objectFit: 'cover',
                                display: 'block',
                                filter: 'brightness(0.60) saturate(0.75)'
                              }}
                            />
                            <div
                              className="video-overlay"
                              style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.30) 55%, rgba(13,13,13,0.05) 100%)'
                              }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 2
                              }}
                            >
                              <div
                                className="video-play-btn"
                                style={{
                                  width: '64px',
                                  height: '64px',
                                  borderRadius: '50%',
                                  background: RED,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <Play
                                  size={20}
                                  fill={WHITE}
                                  className="video-play-icon"
                                  style={{
                                    color: WHITE,
                                    marginLeft: '3px'
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'rgba(0,0,0,0.70)',
                                backdropFilter: 'blur(4px)',
                                color: WHITE,
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                padding: '4px 10px'
                              }}
                            >
                              {mainVideo.duration}
                            </div>
                            <div
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '24px clamp(16px, 3vw, 40px)',
                                zIndex: 2
                              }}
                            >
                              <span
                                style={{
                                  display: 'inline-block',
                                  background: RED,
                                  color: WHITE,
                                  fontSize: '9px',
                                  fontWeight: 800,
                                  letterSpacing: '0.20em',
                                  textTransform: 'uppercase',
                                  padding: '4px 10px',
                                  marginBottom: '10px'
                                }}
                              >
                                {mainVideo.category}
                              </span>
                              <h3
                                style={{
                                  fontSize: 'clamp(18px, 2.5vw, 32px)',
                                  fontWeight: 600,
                                  color: WHITE,
                                  letterSpacing: '-0.03em',
                                  lineHeight: 1.2,
                                  margin: 0
                                }}
                              >
                                {mainVideo.title}
                              </h3>
                              <p
                                style={{
                                  color: 'rgba(255,255,255,0.60)',
                                  fontSize: '14px',
                                  marginTop: '8px',
                                  fontWeight: 500
                                }}
                              >
                                {mainVideo.subtitle}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>

                    {isPlaying && (
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '1000px',
                          margin: '-12px auto 24px',
                          padding: '0 16px'
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            background: RED,
                            color: WHITE,
                            fontSize: '9px',
                            fontWeight: 800,
                            letterSpacing: '0.20em',
                            textTransform: 'uppercase',
                            padding: '4px 10px',
                            marginBottom: '10px'
                          }}
                        >
                          {mainVideo.category}
                        </span>
                        <h3
                          style={{
                            fontSize: 'clamp(18px, 2.5vw, 32px)',
                            fontWeight: 600,
                            color: WHITE,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.2,
                            margin: 0
                          }}
                        >
                          {mainVideo.title}
                        </h3>
                        <p
                          style={{
                            color: 'rgba(255,255,255,0.60)',
                            fontSize: '14px',
                            marginTop: '8px',
                            fontWeight: 500
                          }}
                        >
                          {mainVideo.subtitle}
                        </p>
                      </div>
                    )}

                    {otherVideos.length > 0 && (
                      <div>
                        <h4
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            letterSpacing: '0.25em',
                            textTransform: 'uppercase',
                            color: 'rgba(255, 255, 255, 0.4)',
                            marginBottom: '24px',
                            textAlign: 'center'
                          }}
                        >
                          More Videos
                        </h4>
                        <div className="video-small-grid">
                          {otherVideos.slice(0, visibleCount).map((video, idx) => (
                            <motion.div
                              key={video.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                              transition={{
                                duration: 0.65,
                                ease: [0.22, 1, 0.36, 1],
                                delay: idx * 0.08
                              }}
                            >
                              <div
                                onClick={() => {
                                  setSelectedVideo(video);
                                  setIsPlaying(true);
                                  const playerEl = document.getElementById('main-video-player');
                                  if (playerEl) {
                                    playerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }
                                }}
                                className="video-item video-border-ring"
                                style={{
                                  background: '#111',
                                  position: 'relative',
                                  display: 'block',
                                  borderRadius: '4px',
                                  overflow: 'hidden',
                                  cursor: 'pointer'
                                }}
                              >
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  style={{
                                    width: '100%',
                                    aspectRatio: '16/9',
                                    objectFit: 'cover',
                                    display: 'block',
                                    filter: 'brightness(0.55) saturate(0.70)'
                                  }}
                                />
                                <div
                                  className="video-overlay"
                                  style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.30) 55%, rgba(13,13,13,0.05) 100%)'
                                  }}
                                />
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 2
                                  }}
                                >
                                  <div
                                    className="video-play-btn"
                                    style={{
                                      width: '38px',
                                      height: '38px',
                                      borderRadius: '50%',
                                      background: RED,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    <Play
                                      size={13}
                                      fill={WHITE}
                                      className="video-play-icon"
                                      style={{
                                        color: WHITE,
                                        marginLeft: '1px'
                                      }}
                                    />
                                  </div>
                                </div>
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'rgba(0,0,0,0.72)',
                                    color: WHITE,
                                    fontSize: '9px',
                                    fontWeight: 700,
                                    letterSpacing: '0.06em',
                                    padding: '3px 7px'
                                  }}
                                >
                                  {video.duration}
                                </div>
                                <div
                                  style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '14px 16px',
                                    zIndex: 2
                                  }}
                                >
                                  <span
                                    style={{
                                      display: 'block',
                                      color: RED,
                                      fontSize: '8px',
                                      fontWeight: 800,
                                      letterSpacing: '0.22em',
                                      textTransform: 'uppercase',
                                      marginBottom: '5px'
                                    }}
                                  >
                                    {video.category}
                                  </span>
                                  <h3
                                    style={{
                                      fontSize: '13px',
                                      fontWeight: 600,
                                      color: WHITE,
                                      letterSpacing: '-0.02em',
                                      lineHeight: 1.3,
                                      margin: 0
                                    }}
                                  >
                                    {video.title}
                                  </h3>
                                  <p
                                    style={{
                                      color: 'rgba(255,255,255,0.38)',
                                      fontSize: '10px',
                                      marginTop: '4px',
                                      fontWeight: 500
                                    }}
                                  >
                                    {video.subtitle}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        {otherVideos.length > visibleCount && (
                          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                            <button
                              onClick={() => setVisibleCount(prev => prev + 6)}
                              className="cta-secondary group"
                              style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: WHITE, cursor: 'pointer' }}
                            >
                              <span>More Videos</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </>
      )}

      {/* Bottom rule */}
      <motion.div initial={{
        opacity: 0,
        scaleX: 0
      }} animate={isInView ? {
        opacity: 1,
        scaleX: 1
      } : {
        opacity: 0,
        scaleX: 0
      }} transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5
      }} style={{
        marginTop: 'clamp(40px, 6vw, 72px)',
        height: '1px',
        background: 'linear-gradient(to right, #FC3637 0%, rgba(252,54,55,0.30) 40%, rgba(252,54,55,0) 100%)',
        transformOrigin: 'left'
      }} />
    </div>
  </section>;
};

// ─── MAIN PAGE COMPONENT ──────────────────────────────────────────────────────

export const MediaGalleryPage = () => {
  const width = useWindowWidth();
  const isMobile = width < 768;

  const [selectedEventsPlatform, setSelectedEventsPlatform] = React.useState<string>('All');
  const [selectedPressPlatform, setSelectedPressPlatform] = React.useState<string>('All');
  const [selectedVideoPlatform, setSelectedVideoPlatform] = React.useState<string>('All');

  const PLATFORMS = [
    'All',
    'EmpowaWomen™',
    'EmpowaMen™',
    'EmpowaYouth™',
    'EmpowaEntrepreneurs™',
    'EmpowaGrowth™',
    'The Speakers Firm™',
    'EmpowaWorx™'
  ];

  const filteredEventGroups = selectedEventsPlatform === 'All'
    ? EVENT_GROUPS
    : EVENT_GROUPS.filter(g => g.platform.replace('™', '').trim().toLowerCase() === selectedEventsPlatform.replace('™', '').trim().toLowerCase());

  const filteredPressArticles = selectedPressPlatform === 'All'
    ? PRESS_ARTICLES
    : PRESS_ARTICLES.filter(a => a.platform.replace('™', '').trim().toLowerCase() === selectedPressPlatform.replace('™', '').trim().toLowerCase());

  const filteredVideoItems = selectedVideoPlatform === 'All'
    ? VIDEO_ITEMS
    : VIDEO_ITEMS.filter(v => v.platform.replace('™', '').trim().toLowerCase() === selectedVideoPlatform.replace('™', '').trim().toLowerCase());

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Inline styling additions for local section tab bars:
  const renderLocalPills = (
    currentValue: string,
    onChange: (val: string) => void,
    darkTheme: boolean = true
  ) => (
    <div style={{
      display: 'flex',
      gap: '8px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      padding: '12px 0 4px 0',
      width: '100%'
    }} className="scrollbar-hide">
      {PLATFORMS.map(tab => {
        const isActive = currentValue === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            style={{
              background: isActive
                ? '#FC3637'
                : darkTheme ? 'rgba(255, 255, 255, 0.03)' : 'rgba(13, 13, 13, 0.03)',
              border: isActive
                ? '1px solid #FC3637'
                : darkTheme ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(13, 13, 13, 0.08)',
              color: isActive
                ? '#FFFFFF'
                : darkTheme ? 'rgba(255, 255, 255, 0.60)' : 'rgba(13, 13, 13, 0.60)',
              padding: '6px 14px',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              borderRadius: '9999px',
              whiteSpace: 'nowrap',
              boxShadow: isActive ? '0 4px 12px rgba(252, 54, 55, 0.25)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(252, 54, 55, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(252, 54, 55, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = darkTheme ? 'rgba(255, 255, 255, 0.60)' : 'rgba(13, 13, 13, 0.60)';
                e.currentTarget.style.backgroundColor = darkTheme ? 'rgba(255, 255, 255, 0.03)' : 'rgba(13, 13, 13, 0.03)';
                e.currentTarget.style.borderColor = darkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(13, 13, 13, 0.08)';
              }
            }}
          >
            {tab.replace('™', '')}
          </button>
        );
      })}
    </div>
  );

  return <div className="bg-[#0D0D0D] min-h-screen overflow-x-clip w-full" style={{
    fontFamily: 'Inter, sans-serif',
    WebkitFontSmoothing: 'antialiased'
  }}>
    <style>{`
        .accordion-item-dark {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          transition: background-color 0.3s ease;
        }
        .accordion-item-dark:hover {
          background-color: rgba(255, 255, 255, 0.01);
        }
        .accordion-btn {
          display: flex;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: clamp(20px, 3.5vw, 40px) 0;
          cursor: pointer;
          align-items: center;
          gap: 20px;
          justify-content: space-between;
        }
        .accordion-btn:focus-visible {
          outline: none;
        }
        .accordion-content-inner {
          padding-bottom: clamp(24px, 4vw, 48px);
        }
        .accordion-chevron-wrap {
          transition: border-color 0.25s ease, background-color 0.25s ease;
        }
        .accordion-btn:hover .accordion-chevron-wrap {
          border-color: #FC3637;
          background-color: rgba(252, 54, 55, 0.05);
        }
        .eg-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 16px;
          width: 100%;
        }
        .eg-item {
          position: relative;
          overflow: hidden;
          grid-column: span 12;
        }
        .eg-item img {
          transition: transform 0.6s cubic-bezier(0.21, 0.47, 0.32, 0.98);
        }
        .eg-item:hover img {
          transform: scale(1.04);
        }
        .eg-overlay {
          transition: opacity 0.35s ease;
          opacity: 0;
        }
        .eg-item:hover .eg-overlay {
          opacity: 1;
        }
        @media (min-width: 640px) {
          .eg-item {
            grid-column: span 6;
          }
        }
        @media (min-width: 1024px) {
          .eg-item {
            grid-column: span 4;
          }
        }

        /* ── Press & Media layout classes ── */
        .press-grid {
          display: grid;
          gap: clamp(16px, 3vw, 36px);
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .press-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .press-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .featured-article {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          margin-bottom: clamp(40px, 5vw, 72px);
        }
        @media (min-width: 768px) {
          .featured-article { flex-direction: row; }
        }

        .featured-article-image {
          overflow: hidden;
          min-height: 240px;
          flex-shrink: 0;
          width: 100%;
        }
        @media (min-width: 768px) {
          .featured-article-image {
            min-height: 320px;
            width: 58%;
          }
        }

        .featured-article-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(24px, 3vw, 72px);
          background: #FFFFFF;
        }

        .news-card { transition: box-shadow 0.3s ease; }
        .news-card:hover { box-shadow: 0 12px 48px rgba(0,0,0,0.3); }

        /* ── Video Interviews layout classes ── */
        .video-secondary-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .video-secondary-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .video-small-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .video-small-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .video-small-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .video-item { overflow: hidden; cursor: pointer; position: relative; }
        .video-item img { transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); display: block; width: 100%; height: 100%; object-fit: cover; }
        .video-item:hover img { transform: scale(1.06); }
        .video-play-btn { transition: transform 0.3s ease, background-color 0.3s ease; }
        .video-item:hover .video-play-btn { transform: scale(1.12); background-color: #ffffff !important; }
        .video-item:hover .video-play-icon { color: #FC3637 !important; }
        .video-overlay { opacity: 0; transition: opacity 0.4s ease; }
        .video-item:hover .video-overlay { opacity: 1; }
        .video-border-ring { box-shadow: 0 0 0 0px #FC3637; transition: box-shadow 0.35s ease; }
        .video-border-ring:hover { box-shadow: 0 0 0 3px #FC3637; }
      `}</style>
    <Header />
    <main>
      <Hero />

      {/* Localized pills render inside section headers */}
      <EventsGallerySection items={filteredEventGroups} renderPills={() => renderLocalPills(selectedEventsPlatform, setSelectedEventsPlatform, true)} />
      <PressMediaSection items={filteredPressArticles} renderPills={() => renderLocalPills(selectedPressPlatform, setSelectedPressPlatform, false)} />
      <VideoInterviewsSection items={filteredVideoItems} renderPills={() => renderLocalPills(selectedVideoPlatform, setSelectedVideoPlatform, true)} />
    </main>

    {/* ── CLOSING CTA ─── */}
    <section style={{
      background: '#0F0F0F',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: isMobile ? '64px 20px' : '96px 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <h2 style={{
          fontWeight: 600,
          color: '#ffffff',
          fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 5vw, 3.5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '1.5rem'
        }}>
          {'Ready to Lead with '}
          <span style={{
            color: '#FC3637'
          }}>Influence and Impact?</span>
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: isMobile ? '1rem' : '1.125rem',
          fontWeight: 300,
          lineHeight: 1.7,
          marginBottom: '3rem',
          maxWidth: '660px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          EmpowaWorx™ helps organisations capture their most critical milestones, share their narratives, and showcase their pan-African impact.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/contact" className="cta-primary group h-[56px] min-w-[180px] md:min-w-[200px]">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="#events-gallery" className="cta-secondary group h-[56px] min-w-[160px] md:min-w-[180px]">
            <span>Explore Gallery</span>
          </a>
        </div>
      </div>
      <AfricaWatermark isMobile={isMobile} />
    </section>

    <Footer />
  </div>;
};
