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
                    <a href="index.html" data-type="index-link">scales-on-frets documentation</a>
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
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppContentComponent.html" data-type="entity-link" >AppContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ArrowPointerComponent.html" data-type="entity-link" >ArrowPointerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CircularButtonComponent.html" data-type="entity-link" >CircularButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogAddStringsRulesComponent.html" data-type="entity-link" >DialogAddStringsRulesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogExportComponent.html" data-type="entity-link" >DialogExportComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogNameCustomComponent.html" data-type="entity-link" >DialogNameCustomComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogNameModeComponent.html" data-type="entity-link" >DialogNameModeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogOpenItemComponent.html" data-type="entity-link" >DialogOpenItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogOverlayComponent.html" data-type="entity-link" >DialogOverlayComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogRootModeInitComponent.html" data-type="entity-link" >DialogRootModeInitComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogScaleFoundComponent.html" data-type="entity-link" >DialogScaleFoundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogSubmenuComponent.html" data-type="entity-link" >DialogSubmenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DialogTuningFoundComponent.html" data-type="entity-link" >DialogTuningFoundComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DynamicLineComponent.html" data-type="entity-link" >DynamicLineComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EditFretboardOverlayComponent.html" data-type="entity-link" >EditFretboardOverlayComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmailLinkComponent.html" data-type="entity-link" >EmailLinkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExpandBtnComponent.html" data-type="entity-link" >ExpandBtnComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExportComponent.html" data-type="entity-link" >ExportComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExportOptionsComponent.html" data-type="entity-link" >ExportOptionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FretboardAsTextComponent.html" data-type="entity-link" >FretboardAsTextComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FretboardComponent.html" data-type="entity-link" >FretboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FretNoteComponent.html" data-type="entity-link" >FretNoteComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeadlineBackBtnComponent.html" data-type="entity-link" >HeadlineBackBtnComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeadlineBackComponent.html" data-type="entity-link" >HeadlineBackComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ImprintComponent.html" data-type="entity-link" >ImprintComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoMsgComponent.html" data-type="entity-link" >InfoMsgComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InlineNameLinkComponent.html" data-type="entity-link" >InlineNameLinkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IntroLogoComponent.html" data-type="entity-link" >IntroLogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LegalPageWrapperComponent.html" data-type="entity-link" >LegalPageWrapperComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoaderComponent.html" data-type="entity-link" >LoaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogoComponent.html" data-type="entity-link" >LogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainHeadlineBarComponent.html" data-type="entity-link" >MainHeadlineBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuComponent.html" data-type="entity-link" >MenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuEditComponent.html" data-type="entity-link" >MenuEditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuEditFretboardComponent.html" data-type="entity-link" >MenuEditFretboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuEditScaleComponent.html" data-type="entity-link" >MenuEditScaleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MoreMenuComponent.html" data-type="entity-link" >MoreMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OpenItemComponent.html" data-type="entity-link" >OpenItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrderingBarComponent.html" data-type="entity-link" >OrderingBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PaginationDotsComponent.html" data-type="entity-link" >PaginationDotsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PrivacyComponent.html" data-type="entity-link" >PrivacyComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScrollableListArrowComponent.html" data-type="entity-link" >ScrollableListArrowComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScrollableListComponent.html" data-type="entity-link" >ScrollableListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScrollableListItemComponent.html" data-type="entity-link" >ScrollableListItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScrollableListSubmenuComponent.html" data-type="entity-link" >ScrollableListSubmenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SettingsDisplayComponent.html" data-type="entity-link" >SettingsDisplayComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SlideToggleComponent.html" data-type="entity-link" >SlideToggleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ToastMessageComponent.html" data-type="entity-link" >ToastMessageComponent</a>
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
                                    <a href="directives/AutofocusDirective.html" data-type="entity-link" >AutofocusDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/CopyToClipboardDirective.html" data-type="entity-link" >CopyToClipboardDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ExportToDirective.html" data-type="entity-link" >ExportToDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/HoverDirective.html" data-type="entity-link" >HoverDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SearchCurrentDirective.html" data-type="entity-link" >SearchCurrentDirective</a>
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
                                <a href="classes/Fretboard.html" data-type="entity-link" >Fretboard</a>
                            </li>
                            <li class="link">
                                <a href="classes/Note.html" data-type="entity-link" >Note</a>
                            </li>
                            <li class="link">
                                <a href="classes/Scale.html" data-type="entity-link" >Scale</a>
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
                                    <a href="injectables/CurrentFretboardService.html" data-type="entity-link" >CurrentFretboardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CurrentScaleService.html" data-type="entity-link" >CurrentScaleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomizeService.html" data-type="entity-link" >CustomizeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DialogService.html" data-type="entity-link" >DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DisplayService.html" data-type="entity-link" >DisplayService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HoverService.html" data-type="entity-link" >HoverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScalesDataService.html" data-type="entity-link" >ScalesDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ToastMessageService.html" data-type="entity-link" >ToastMessageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TuningsDataService.html" data-type="entity-link" >TuningsDataService</a>
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
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Config.html" data-type="entity-link" >Config</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtendedTuning.html" data-type="entity-link" >ExtendedTuning</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Instrument.html" data-type="entity-link" >Instrument</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NoteName.html" data-type="entity-link" >NoteName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ordering.html" data-type="entity-link" >Ordering</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScaleCategory.html" data-type="entity-link" >ScaleCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScaleMode.html" data-type="entity-link" >ScaleMode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StorageSave.html" data-type="entity-link" >StorageSave</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tuning.html" data-type="entity-link" >Tuning</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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