import {
  faMobileAlt,
  faMapMarkedAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";

export const usefulLink = [
  { name: "Home", id: 1 },
  { name: "About us", id: 2 },
  { name: "Services", id: 3 },
];
// export const ourServices = [
//     {name: 'Strategy & Research', id: 6},
//     {name: 'Web Design', id: 7},
//     {name: 'Web Development', id: 8},
//     {name: 'Digital Marketing', id: 9},
//     {name: 'Graphic Design', id: 10}
// ]

export const footerInfo = [
  { icon: faBuffer, info1: "ABADIQ Medical Billing", id: 1 },
  {
    icon: faMobileAlt,
    info1: "718-208-4434",
    link: "tel:7182084434",
    linkTitle: "Call Us",
    id: 2,
  },
  {
    icon: faEnvelope,
    info1: "info@abadiq.com",
    link: "mailto:info@abadiq.com",
    linkTitle: "Email Us",
    id: 3,
  },
];
