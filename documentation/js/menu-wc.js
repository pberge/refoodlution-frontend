'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend-rest documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-413d43eb3a6d2794e8e113be3a50298a9c349da6fb46c16939b46e4131ef4d3e07fbb75a7974d1765bee48b0145ff206ded6ea335f5d779a182e892c2e25f79b"' : 'data-bs-target="#xs-components-links-module-AppModule-413d43eb3a6d2794e8e113be3a50298a9c349da6fb46c16939b46e4131ef4d3e07fbb75a7974d1765bee48b0145ff206ded6ea335f5d779a182e892c2e25f79b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-413d43eb3a6d2794e8e113be3a50298a9c349da6fb46c16939b46e4131ef4d3e07fbb75a7974d1765bee48b0145ff206ded6ea335f5d779a182e892c2e25f79b"' :
                                            'id="xs-components-links-module-AppModule-413d43eb3a6d2794e8e113be3a50298a9c349da6fb46c16939b46e4131ef4d3e07fbb75a7974d1765bee48b0145ff206ded6ea335f5d779a182e892c2e25f79b"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientCardMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientCardMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientMenuItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientMenuItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientMenuRowComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientMenuRowComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmEmailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmEmailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FullPdfViewerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FullPdfViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QRGeneratorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QRGeneratorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecoverComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecoverComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ckeditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ckeditorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoggedModule.html" data-type="entity-link" >LoggedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LoggedModule-46327edc32f9233ef6c93725f4f8313de77446e77002611dd88d142f9d21f58e7fd28ded5e1d214c3fcf8e39c8d46cac7a2f0e942c701dc280cd8a9f97d47c73"' : 'data-bs-target="#xs-components-links-module-LoggedModule-46327edc32f9233ef6c93725f4f8313de77446e77002611dd88d142f9d21f58e7fd28ded5e1d214c3fcf8e39c8d46cac7a2f0e942c701dc280cd8a9f97d47c73"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoggedModule-46327edc32f9233ef6c93725f4f8313de77446e77002611dd88d142f9d21f58e7fd28ded5e1d214c3fcf8e39c8d46cac7a2f0e942c701dc280cd8a9f97d47c73"' :
                                            'id="xs-components-links-module-LoggedModule-46327edc32f9233ef6c93725f4f8313de77446e77002611dd88d142f9d21f58e7fd28ded5e1d214c3fcf8e39c8d46cac7a2f0e942c701dc280cd8a9f97d47c73"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfigurationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigurationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DaySelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DaySelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DishCreationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DishCreationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DishItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DishItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DishListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DishListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageSubComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageSubComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuCreationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuCreationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuPdfComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuPdfComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QrDownloadComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QrDownloadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RestaurantComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RestaurantComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RestaurantsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RestaurantsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScheduleSelectorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScheduleSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SeasoningCreationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeasoningCreationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SeasoningItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeasoningItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SeasoningListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeasoningListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideNavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscriptionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TConfigComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TConfigComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TItemDishComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TItemDishComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TItemStringComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TItemStringComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggedRoutingModule.html" data-type="entity-link" >LoggedRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link" >PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-PipesModule-e145150c97318d2690df05a65e50490991f53b1e1da1ed8608023c083388bdb3fd01de73f3ece0c12eaf5ad28b3356f59034566e79d708373361338d1e2f4237"' : 'data-bs-target="#xs-pipes-links-module-PipesModule-e145150c97318d2690df05a65e50490991f53b1e1da1ed8608023c083388bdb3fd01de73f3ece0c12eaf5ad28b3356f59034566e79d708373361338d1e2f4237"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-e145150c97318d2690df05a65e50490991f53b1e1da1ed8608023c083388bdb3fd01de73f3ece0c12eaf5ad28b3356f59034566e79d708373361338d1e2f4237"' :
                                            'id="xs-pipes-links-module-PipesModule-e145150c97318d2690df05a65e50490991f53b1e1da1ed8608023c083388bdb3fd01de73f3ece0c12eaf5ad28b3356f59034566e79d708373361338d1e2f4237"' }>
                                            <li class="link">
                                                <a href="pipes/AllergenMessagePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AllergenMessagePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TitleCaseWordPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TitleCaseWordPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-fe05a9a3332d945eca573cdf59e6fdf5ba931ac291a413e8ed13308a3fabf7e051457c140254a7bcc5f769ab3d04a1f1fd67d4f2da007bc544c5da2289a88b99"' : 'data-bs-target="#xs-components-links-module-SharedModule-fe05a9a3332d945eca573cdf59e6fdf5ba931ac291a413e8ed13308a3fabf7e051457c140254a7bcc5f769ab3d04a1f1fd67d4f2da007bc544c5da2289a88b99"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-fe05a9a3332d945eca573cdf59e6fdf5ba931ac291a413e8ed13308a3fabf7e051457c140254a7bcc5f769ab3d04a1f1fd67d4f2da007bc544c5da2289a88b99"' :
                                            'id="xs-components-links-module-SharedModule-fe05a9a3332d945eca573cdf59e6fdf5ba931ac291a413e8ed13308a3fabf7e051457c140254a7bcc5f769ab3d04a1f1fd67d4f2da007bc544c5da2289a88b99"' }>
                                            <li class="link">
                                                <a href="components/CheckoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlatformLanguageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlatformLanguageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PopupinfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PopupinfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PricingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PricingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RedsysResponseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedsysResponseComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TranslocoRootModule.html" data-type="entity-link" >TranslocoRootModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/PwdMatchValidatorDirective.html" data-type="entity-link" >PwdMatchValidatorDirective</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Allergen.html" data-type="entity-link" >Allergen</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link" >AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Dish.html" data-type="entity-link" >Dish</a>
                            </li>
                            <li class="link">
                                <a href="classes/DishTranslation.html" data-type="entity-link" >DishTranslation</a>
                            </li>
                            <li class="link">
                                <a href="classes/Menu.html" data-type="entity-link" >Menu</a>
                            </li>
                            <li class="link">
                                <a href="classes/Restaurant.html" data-type="entity-link" >Restaurant</a>
                            </li>
                            <li class="link">
                                <a href="classes/Seasoning.html" data-type="entity-link" >Seasoning</a>
                            </li>
                            <li class="link">
                                <a href="classes/Section.html" data-type="entity-link" >Section</a>
                            </li>
                            <li class="link">
                                <a href="classes/Serializable.html" data-type="entity-link" >Serializable</a>
                            </li>
                            <li class="link">
                                <a href="classes/StringTranslation.html" data-type="entity-link" >StringTranslation</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DishService.html" data-type="entity-link" >DishService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MenuService.html" data-type="entity-link" >MenuService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestaurantService.html" data-type="entity-link" >RestaurantService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeasoningService.html" data-type="entity-link" >SeasoningService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscriptionService.html" data-type="entity-link" >SubscriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslationService.html" data-type="entity-link" >TranslationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TranslocoHttpLoader.html" data-type="entity-link" >TranslocoHttpLoader</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AutoRenewCheckGuard.html" data-type="entity-link" >AutoRenewCheckGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/confirmedEmailGuard.html" data-type="entity-link" >confirmedEmailGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/confirmedEmailPreviewGuard.html" data-type="entity-link" >confirmedEmailPreviewGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CreditCardExpiryGuard.html" data-type="entity-link" >CreditCardExpiryGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PaymentDataGuard2.html" data-type="entity-link" >PaymentDataGuard2</a>
                            </li>
                            <li class="link">
                                <a href="guards/PaymentDataGuardPreview.html" data-type="entity-link" >PaymentDataGuardPreview</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ScheduleConfig.html" data-type="entity-link" >ScheduleConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});