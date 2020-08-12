import { mainLogic } from "./Controller/mainLogic";
import { Menu } from "./View/Menu";
import { ModelData } from "./Model/ModelData";
import { Chips } from "./View/Chips";
import { ModalSettings } from './View/ModalSettings';
import './styles.css';


const parent = document.querySelector('body.Expand');
const menu = new Menu(parent);
const modelData = new ModelData();
const modal = new ModalSettings(parent, Chips);

new mainLogic(menu, modal, modelData);
