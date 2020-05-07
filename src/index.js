import {CreateNavigationBar} from './Navigation/NavigationBar';
import {RouterComponent} from '../Router/RouterComponent';

let NavigationBar = document.getElementById("navigationBarContainer");
CreateNavigationBar(NavigationBar)

var par = document.getElementById("contentContainer")
var router = new RouterComponent();

router.openMainPage(par);