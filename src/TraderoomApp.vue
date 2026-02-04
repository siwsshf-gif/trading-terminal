<template>
    

<div class="traderoom-root">

  <div v-if="!authReady" class="boot-screen"></div>

  <div v-else>

    <div v-if="showAccountsModal"
      class="accounts-modal-mask"
      @mousedown.self="onAccountsBackdropClick">
      <div class="accounts-modal-card" role="dialog" aria-modal="true">
        <button class="accounts-modal-close" @click="closeAccountsModal">×</button>


        <!-- MODAL CUENTAS COMERCIALES -->
        <div class="acc-modal-overlay"
          v-if="showAccountsModal"
          @click.self="closeAccountsModal">
          <div class="acc-modal">
            <!-- BARRA AZUL SUPERIOR -->
            <div class="acc-modal-topbar">
              Commercial accounts: Core Terminal App
            </div>

            <div class="acc-modal-inner">
              <!-- COLUMNA IZQUIERDA: TABS -->
              <aside class="acc-modal-sidebar">
                <button class="acc-tab-btn"
                  :class="{ 'acc-tab-btn--active': accountsTab === 'login' }"
                  @click="accountsTab = 'login'">
                  <span class="acc-tab-icon">
                    <i class="fa-solid fa-link"></i>
                  </span>
                  <span class="acc-tab-text">Login to your account</span>
                </button>

                <button class="acc-tab-btn" v-if="!isInvestor && currentUser"
                  :class="{ 'acc-tab-btn--active': accountsTab === 'demo' }"
                  @click="accountsTab = 'demo'">
                  <span class="acc-tab-icon">
                    <i class="fa-solid fa-user-plus"></i>
                  </span>
                  <span class="acc-tab-text">Open demo account</span>
                </button>

                <button class="acc-tab-btn" v-if="!isInvestor && currentUser"
                  :class="{ 'acc-tab-btn--active': accountsTab === 'real' }"
                  @click="accountsTab = 'real'">
                  <span class="acc-tab-icon">
                    <i class="fa-solid fa-briefcase"></i>
                  </span>
                  <span class="acc-tab-text">Open real account</span>
                </button>

                <button class="acc-tab-btn"
                  :class="{ 'acc-tab-btn--active': accountsTab === 'account' }"
                  @click="accountsTab = 'account'">
                  <span class="acc-tab-icon">
                    <i class="fa-solid fa-user"></i>
                  </span>
                  <span class="acc-tab-text">Account</span>
                </button>

                <button class="acc-tab-btn" @click="signOut" v-if="currentUser">
                  <span class="acc-tab-icon">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  </span>
                  <span class="acc-tab-text">Logout</span>
                </button>

                <div class="acc-sidebar-footer">
                  <p class="acc-sidebar-copy">
                    © Core Terminal App - Traderoom<br>
                    <!--<a href="#" class="acc-link">User License Agreement.</a>-->
                  </p>
                </div>
              </aside>

              <!-- COLUMNA DERECHA: CONTENIDO DE TABS -->
              <section class="acc-modal-content">
                
                <!-- TAB 1: CONECTARSE A LA CUENTA -->
                <div v-if="accountsTab === 'login'" class="acc-pane">
                  <h3 class="acc-pane-title">Login to your account</h3>

                  <div class="acc-form-grid">
                    <div class="acc-form-row">
                      <label class="acc-label">Login</label>
                      <input
                        v-model="authEmail"
                        type="email"
                        class="acc-input acc-mt"
                        placeholder="Enter login"
                      />
                    </div>

                    <div class="acc-form-row acc-form-row--password">
                      <div class="acc-form-left">
                        <label class="acc-label">Password</label>
                        <input
                          v-model="authPassword"
                          type="password"
                          class="acc-input acc-mt2"
                          placeholder="Enter password"
                        />
                      </div>
                      <label class="acc-checkbox">
                        <input type="checkbox">
                        <span>Save Password</span>
                      </label>
                    </div>

                    <div class="acc-form-row acc-form-row--smalltext acc-mt2">
                      <span class="acc-help-text">
                        Forgot your password?
                        <a href="mailto:support@coreterminal.app
                              ?subject=Web%20Terminal%20Support
                              &body=Hello%20support,%0A%0AUser:%20%0AIssue:%20"
                        class="acc-link">
                        Contact support
                      </a>

                      </span>
                    </div>

                    <div class="acc-form-row acc-mt">
                      <label class="acc-label">Server</label>
                      <div class="acc-static-field">coreterminal.app - Real</div>
                    </div>
                  </div>

                  <div class="acc-pane-footer">
                    <p v-if="authError" style="color:#ef4444; margin-top:8px;">
                      {{ authError }}
                    </p>
                    <button class="acc-btn acc-btn--secondary"
                      style="margin-left: 8px;" @click="signOut" v-if="currentUser">
                      Logout
                    </button>
                    <button class="acc-btn acc-btn--primary" @click="signIn()" v-if="!currentUser">
                      Login to your account
                    </button>
                    
                  </div>
                </div>

                <!-- TAB 2: ABRIR CUENTA DEMO -->
                <div v-if="accountsTab === 'demo'" class="acc-pane">
                  <h3 class="acc-pane-title">Open demo account</h3>

                  <div class="acc-form-grid">
                    <div class="acc-form-row">
                      <label class="acc-label">Platform</label>
                      <div class="acc-static-field acc-static-field--link">
                        Trading Terminal
                      </div>
                    </div>

                    <div class="acc-form-row acc-form-row--two">
                      <div>
                        <label class="acc-label">Name</label>
                        <input type="text" class="acc-input" placeholder="Nombre">
                      </div>
                      <div>
                        <label class="acc-label">Surname</label>
                        <input type="text" class="acc-input" placeholder="Apellido">
                      </div>
                    </div>

                    <div class="acc-form-row">
                      <label class="acc-label">Email</label>
                      <input type="email" class="acc-input" placeholder="Email">
                    </div>

                    <div class="acc-form-row">
                      <label class="acc-label">Phone</label>
                      <input type="text" class="acc-input" placeholder="Número de teléfono">
                    </div>

                    <div class="acc-form-row">
                      <label class="acc-checkbox">
                        <input type="checkbox">
                        <span>Use hedging in trading</span>
                      </label>
                    </div>

                    <div class="acc-form-row acc-form-row--two">
                      <div>
                        <label class="acc-label">Account type</label>
                        <select class="acc-input">
                          <option>Forex Hedged USD</option>
                        </select>
                      </div>
                    </div>

                    <div class="acc-form-row acc-form-row--two acc-form-row--deposit">
                      <div class="acc-input-group">
                        <label class="acc-label">Deposit</label>
                        <div class="acc-input-multi">
                          <input type="text" class="acc-input" value="100000">
                          <span class="acc-input-addon">USD</span>
                        </div>
                      </div>
                      <div class="acc-input-group">
                        <label class="acc-label">Leverage</label>
                        <select class="acc-input">
                          <option>1:10</option>
                          <option>1:20</option>
                          <option>1:50</option>
                          <option>1:100</option>
                          <option>1:200</option>
                          <option>1:400</option>
                          <option>1:500</option>
                        </select>
                      </div>
                    </div>

                    <div class="acc-form-row">
                      <label class="acc-checkbox">
                        <input type="checkbox">
                        <span>
                          I accept the terms and conditions to open an account and the data protection policy.
                        </span>
                      </label>
                    </div>

                    <div class="acc-form-row acc-form-row--smalltext">
                      <a href="#" class="acc-link">Core Terminal App</a>
                    </div>
                  </div>

                  <div class="acc-pane-footer">
                    <button class="acc-btn acc-btn--primary">
                      Open demo account
                    </button>
                  </div>
                </div>

                <!-- TAB 3: ABRIR CUENTA REAL (MISMO LAYOUT, TEXTO DIFERENTE) -->
                <div v-if="accountsTab === 'real'" class="acc-pane">
                  <h3 class="acc-pane-title">Open real account</h3>

                  <!-- Puedes reutilizar EXACTAMENTE el mismo formulario que demo -->
                  <!-- (si quieres diferenciar algo, aquí cambias textos o selects) -->
                  <div class="acc-form-grid">
                    <!-- copia del contenido del tab demo -->
                    <!-- ... si quieres lo dejamos igual por ahora ... -->
                    <div class="acc-form-row">
                      <label class="acc-label">Platform</label>
                      <div class="acc-static-field acc-static-field--link">
                        Core Terminal App
                      </div>
                    </div>

                    <div class="acc-form-row acc-form-row--two">
                      <div>
                        <label class="acc-label">Name</label>
                        <input type="text" class="acc-input" placeholder="Nombre">
                      </div>
                      <div>
                        <label class="acc-label">Surname</label>
                        <input type="text" class="acc-input" placeholder="Apellido">
                      </div>
                    </div>

                    <div class="acc-form-row">
                      <label class="acc-label">Email</label>
                      <input type="email" class="acc-input" placeholder="Email">
                    </div>

                    <div class="acc-form-row">
                      <label class="acc-label">Phone</label>
                      <input type="text" class="acc-input" placeholder="Número de teléfono">
                    </div>

                    <div class="acc-form-row">
                      <label class="acc-checkbox">
                        <input type="checkbox">
                        <span>Use hedging in trading</span>
                      </label>
                    </div>

                    <div class="acc-form-row acc-form-row--two">
                      <div>
                        <label class="acc-label">Account type</label>
                        <select class="acc-input">
                          <option>Forex Hedged USD</option>
                        </select>
                      </div>
                    </div>

                    <div class="acc-form-row acc-form-row--two acc-form-row--deposit">
                      <div class="acc-input-group">
                        <label class="acc-label">Deposit</label>
                        <div class="acc-input-multi">
                          <input type="text" class="acc-input" value="100000">
                          <span class="acc-input-addon">USD</span>
                        </div>
                      </div>
                      <div class="acc-input-group">
                        <label class="acc-label">Apalancamiento</label>
                        <select class="acc-input">
                          <option>1:10</option>
                          <option>1:20</option>
                          <option>1:50</option>
                          <option>1:100</option>
                          <option>1:200</option>
                          <option>1:400</option>
                          <option>1:500</option>
                        </select>
                      </div>
                    </div>

                    <div class="acc-form-row">
                      <label class="acc-checkbox">
                        <input type="checkbox">
                        <span>
                          I accept the terms and conditions to open an account and the data protection policy.
                        </span>
                      </label>
                    </div>

                    <div class="acc-form-row acc-form-row--smalltext">
                      <a href="#" class="acc-link">Core Terminal App</a>
                    </div>
                  </div>

                  <div class="acc-pane-footer">
                    <button class="acc-btn acc-btn--primary">
                      Open real account
                    </button>
                  </div>
                </div>

                <!-- TAB 4: CUENTA (DETALLE DE LA CUENTA SELECCIONADA) -->
                <div v-if="accountsTab === 'account'" class="acc-pane acc-pane--accounts">
                  <template v-if="activeSubAccount">
                    <!-- CABECERA: NOMBRE + META + BALANCE -->
                    <div class="acc-account-header">
                      <div>
                        <div class="acc-account-title">
                          {{ activeSubAccount.owner_name || currentUser?.full_name || currentUser?.email }}
                        </div>
                        <div class="acc-account-meta">
                          {{ activeSubAccount.login || activeSubAccount.account_number }}
                          -
                          {{ activeSubAccount.server_name || activeSubAccount.server || 'Hedging-server' }}
                          -
                          {{ activeSubAccount.mode || 'Hedge' }}
                        </div>
                      </div>

                      <div class="acc-account-header-balance">
                        {{ formatMoney(activeSubAccount.balance || 0) }}
                        {{ activeSubAccount.currency || 'USD' }}
                      </div>
                    </div>

                    <!-- GRID INFERIOR: NOMBRE / SERVIDOR / LOGIN -->
                    <div class="acc-account-grid">
                      <div>
                        <span class="acc-account-small-label">Name</span>
                        <div class="acc-account-value">
                          {{ activeSubAccount.owner_name || currentUser?.email }}
                        </div>
                      </div>
                      <div>
                        <span class="acc-account-small-label">Server</span>
                        <div class="acc-account-value">
                          {{ activeSubAccount.server_name || activeSubAccount.server || 'Hedging-server' }}
                        </div>
                      </div>
                      <div>
                        <span class="acc-account-small-label">Login</span>
                        <div class="acc-account-value">
                          {{ activeSubAccount.login || activeSubAccount.account_number }}
                        </div>
                      </div>
                    </div>

                    <div class="acc-pane-footer acc-pane-footer--right">
                      <button class="acc-btn acc-btn--secondary"
                        style="margin-left: 8px;" @click="signOut" v-if="currentUser">
                        Logout
                      </button>
                      <button class="acc-btn acc-btn--primary"  @click="handleSelectSubAccount(activeSubAccount)" v-if="!isSubAccountActive(activeSubAccount)">
                        Login to your account
                      </button>
                      <!-- Más adelante aquí metemos "Eliminar" si quieres -->
                    </div>
                  </template>

                  <template v-else>
                    <div class="acc-empty-text">
                      No account selected.
                    </div>
                  </template>
                </div>
                
              </section>
            </div>
          </div>
        </div>


      </div>
    </div>

    <div class="traderoom" :class="{ 'traderoom-blocked': !currentUser }">

      <div class="tr-layout">

        <!-- SIDELEFT1 -->
        <aside id="sideleft1" class="sideleft1">

          <div class="sl-group sl-group2">
            <button class="sl-btn sl-btn2" @click="toggleMainMenu">
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>



          <div class="sl-group sl-group-bottom">
            <button class="sl-btn"
              :class="{ active: activePositionsTab === 'orders' }"
              @click="handlePositionsTab('orders', $event)">
              <i class="fa-solid fa-list-ul"></i>
            </button>
            <button class="sl-btn"
              :class="{ active: activePositionsTab === 'history' }"
              @click="handlePositionsTab('history', $event)">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </button>
            <button class="sl-btn" v-if="!isInvestor"
              :class="{ active: activePositionsTab === 'journal' }"
              @click="handlePositionsTab('journal', $event)">
              <i class="fa-solid fa-book"></i>
            </button>
          </div>

        </aside>

        <!-- TradingForm + Chart + Watchlist -->
        <div class="main-top">

          <section id="tradingForm" class="trading-form mobile-section"
            v-show="isMobile ? mobileActiveView === 'trade' : showTradingForm"> <!-- :class="{ 'trading-form--readonly': isInvestor }" -->

            <div ref="handleRight" class="resize-handle resize-handle-right"></div>
            
            <div class="ot-panel">
              <!-- HEADER -->
              <div class="ot-header">
                <div class="ot-type-wrap">
                  <!-- Modo normal: se ve el select -->
                  <select v-if="!editingPosition && !editingPendingOrder"
                    v-model="orderType"
                    class="ot-type-select">
                    <option value="market">Market Execution</option>
                    <option value="buy_limit">Buy Limit</option>
                    <option value="sell_limit">Sell Limit</option>
                    <option value="buy_stop">Buy Stop</option>
                    <option value="sell_stop">Sell Stop</option>
                    <option value="buy_stop_limit">Buy Stop Limit</option>
                    <option value="sell_stop_limit">Sell Stop Limit</option>
                  </select>

                  <!-- Modo edición: posición abierta O pending order -->
                  <div v-else class="ot-type-edit-header"
                    :class="{
                      'ot-type-edit-sell':
                        (editingPosition?.side === 'sell') ||
                        (editingPendingOrder?.side === 'sell'),
                      'ot-type-edit-buy':
                        (editingPosition?.side === 'buy') ||
                        (editingPendingOrder?.side === 'buy')}">
                    <!-- Si es posición abierta -->
                    <template v-if="editingPosition">
                      #{{ editingPosition.ticket }}
                      {{ editingPosition.side }}
                      {{ editingPosition.quantity_lots }}
                      {{ editingPosition.symbol || 'EURUSD' }}
                      {{ editingPosition.avg_entry_price }}
                    </template>

                    <!-- Si es pending order -->
                    <template v-else-if="editingPendingOrder">
                      #{{ editingPendingOrder.ticket }}
                      {{ formatOrderType(editingPendingOrder) }}
                      {{ editingPendingOrder.quantity_lots || editingPendingOrder.volume_lots || editingPendingOrder.volume }}
                      {{ editingPendingOrder.symbol || editingPendingOrder.instrument_symbol || 'EURUSD' }}
                    </template>
                  </div>

                  <i v-if="!editingPosition && !editingPendingOrder" class="fa-solid fa-chevron-down ot-type-arrow"></i>
                </div>

                <button class="ot-close" @click="closeTradingForm">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div class="ot-body">
                <!-- Volume -->
                <div v-show="showVolume">
                  <div class="ot-field-header">
                    <span>Volume</span>
                    <span class="ot-right-text"></span>
                  </div>
                  <div class="ot-stepper ot-stepper-lg"
                      :class="{ 'ot-stepper--disabled': isEditingPendingOrder }">
                    <button class="ot-step-btn"
                      :disabled="isEditingPendingOrder" @click="volume = Math.max(0.01, +(volume - 0.01).toFixed(2))">-</button>
                      <input class="ot-step-value-input"
                        type="number"
                        step="0.01"
                        min="0.01"
                        value="0.01"
                        v-model.number="volume"
                        :disabled="isEditingPendingOrder">
                    <button class="ot-step-btn"
                      @click="volume = +(volume + 0.01).toFixed(2)"
                      :disabled="isEditingPendingOrder">+</button>
                  </div>
                </div>

                <!-- Volume / Price  -->
                <div class="ot-row-2col" v-show="showVolumePrice">
                  <div class="ot-col">
                    <div class="ot-field-header">
                      <span>Volume</span>
                      <span class="ot-right-text"></span>
                    </div>
                    <div class="ot-stepper"
                        :class="{ 'ot-stepper--disabled': isEditingPendingOrder }">
                      <button class="ot-step-btn"
                              :disabled="isEditingPendingOrder">-</button>

                      <input class="ot-step-value-input"
                            type="number"
                            v-model.number="volume"
                            :disabled="isEditingPendingOrder">

                      <button class="ot-step-btn"
                              :disabled="isEditingPendingOrder">+</button>
                    </div>
                  </div>
                  <div class="ot-col">
                    <div class="ot-field-header">
                      <span>Price</span>
                    </div>
                    <div
                      class="ot-stepper"
                      :class="{ 'ot-stepper--disabled': isEditingOpenPosition }"
                    >
                      <button class="ot-step-btn" :disabled="isEditingOpenPosition">-</button>
                      <input
                        class="ot-step-value-input"
                        type="number"
                        v-model.number="price"
                        :disabled="isEditingOpenPosition"
                      />
                      <button class="ot-step-btn" :disabled="isEditingOpenPosition">+</button>
                    </div>

                  </div>
                </div>

                <!-- Price / Stop Limit Price  -->
                <div class="ot-row-2col mt-form" v-show="showPriceStopLimit">
                  <div class="ot-col">
                    <div class="ot-field-header">
                      <span>Price</span>
                    </div>
                    <div class="ot-stepper">
                      <button class="ot-step-btn">−</button>
                      <input class="ot-step-value-input" type="number" v-model.number="price" />
                      <button class="ot-step-btn">+</button>
                    </div>
                  </div>
                  <div class="ot-col">
                    <div class="ot-field-header">
                      <span>Stop Limit Price</span>
                    </div>
                    <div class="ot-stepper">
                      <button class="ot-step-btn">−</button>
                      <input class="ot-step-value-input" type="number" v-model.number="stopLimitPrice" />
                      <button class="ot-step-btn">+</button>
                    </div>
                  </div>
                </div>

                <!-- Stop Loss / Take Profit -->
                <div class="ot-row-2col mt-form" v-show="showSLTP">
                  <div class="ot-col">
                    <div class="ot-field-header">
                      <span>Stop Loss</span>
                    </div>
                    <div class="ot-stepper">
                      <button class="ot-step-btn">−</button>
                      <input class="ot-step-value-input" type="number" v-model.number="stopLoss" />
                      <button class="ot-step-btn">+</button>
                    </div>
                  </div>
                  <div class="ot-col">
                    <div class="ot-field-header">
                      <span>Take Profit</span>
                    </div>
                    <div class="ot-stepper">
                      <button class="ot-step-btn">−</button>
                      <input class="ot-step-value-input" type="number" v-model.number="takeProfit" />
                      <button class="ot-step-btn">+</button>
                    </div>
                  </div>
                </div>

                <!-- Expiration -->
                <div v-show="showExpiration" class="mt-form">
                  <div class="ot-field-header">
                    <span>Expiration</span>
                  </div>
                  <div class="ot-select2-wrap">
                    <select class="ot-select2" v-model="expirationType" >
                      <option value="gtc">GTC</option>
                      <option value="today">Today</option>
                      <option value="specified">Specified</option>
                      <option value="day">Specified Day</option>
                    </select>
                    <i class="fa-solid fa-chevron-down ot-select2-arrow"></i>
                  </div>
                </div>

                <!-- Comment -->
                <div v-show="showComment" class="mt-form">
                  <div class="ot-field-header">
                    <span>Comment</span>
                  </div>
                  <textarea
                    class="ot-textarea"
                    :class="{ 'ot-textarea--disabled': isEditingOpenPosition || isEditingPendingOrder }"
                    v-model="orderComment"
                    :disabled="isEditingOpenPosition || isEditingPendingOrder"
                  ></textarea>
                </div>

                <div v-show="showSellBuyMarket" class="mt-form">
                  <!-- Precios -->
                  <div class="ot-prices">
                    <div class="ot-price ot-price-left"
                      :class="{
                        'mw-bid-up': bidDirection === 'up',
                        'mw-bid-down': bidDirection === 'down'
                      }">
                      {{ formatPrice(activeBid, activeInstrumentSymbol || undefined) }}
                    </div>
                    <div class="ot-price-divider"></div>
                    <div class="ot-price ot-price-right"
                      :class="{
                        'mw-ask-up': askDirection === 'up',
                        'mw-ask-down': askDirection === 'down'
                      }">
                      {{ formatPrice(activeAsk, activeInstrumentSymbol || undefined) }}
                    </div>

                  </div>
                  <!-- Botones Sell / Buy -->
                  <div class="ot-actions"
                    :class="{
                      'ot-actions--error-buy': marketErrorBuy,
                      'ot-actions--error-sell': marketErrorSell
                    }">
                      <button
                        class="ot-btn ot-btn-sell"
                        :disabled="tradingLoading || !!marketErrorSell || !canClickMarketSell"
                        :class="{ 'ot-btn-disabled': !canClickMarketSell }"
                        @click="placeMarketOrder('sell', null, false, true)">
                        Sell by Market
                      </button>
                      <button
                        class="ot-btn ot-btn-buy"
                        :disabled="tradingLoading || !!marketErrorBuy || !canClickMarketBuy"
                        :class="{ 'ot-btn-disabled': !canClickMarketBuy }"
                        @click="placeMarketOrder('buy', null, false, true)">
                        Buy by Market
                      </button>
                  </div>
                </div>

                <div v-if="formErrorMessage" class="ot-form-error">
                  {{ formErrorMessage }}
                </div>

                <!-- Botón Place order BUY (solo cuando NO estamos editando nada) -->
                <div class="ot-aw mt-form" v-show="showPlaceOrderBuy && !editingPosition && !editingPendingOrder">
                  <button class="ot-btn ot-btn-buy"
                    @click="placePendingOrder('buy')"
                    :disabled="isPlaceOrderDisabled">
                    Place order
                  </button>
                </div>

                <!-- Botón Place order SELL (solo cuando NO estamos editando nada) -->
                <div class="ot-aw mt-form" v-show="showPlaceOrderSell && !editingPosition && !editingPendingOrder">
                  <button class="ot-btn ot-btn-sell"
                    @click="placePendingOrder('sell')"
                    :disabled="isPlaceOrderDisabled">
                    Place order
                  </button>
                </div>

                <!-- Botón MODIFICAR (posiciones abiertas y pending) -->
                <div class="ot-aw mt-form" v-show="showModifyButton">
                  <button class="ot-btn ot-btn-sell"
                    @click="onClickModify"
                    :disabled="!canClickModify"
                    :class="{ 'ot-btn-disabled': !canClickModify }">
                    Modificar
                  </button>
                </div>

                <!-- Botón CLOSE de posición abierta -->
                <div class="ot-aw mt-form2" v-show="showClosePositionButton">
                  <button class="ot-btn ot-btn-close" @click="closeEditingPosition">
                    Close #{{ editingPosition?.ticket }} {{ editingPosition?.side }}
                    {{ editingPosition?.quantity_lots }} {{ editingPosition?.symbol || 'EURUSD' }}
                    at {{ editingPosition?.avg_entry_price }}
                  </button>
                </div>

                <!-- Botón ELIMINAR pending order (solo cuando hay una pending en edición) -->
                <div class="ot-aw mt-form2" v-if="showDeletePendingButton && editingPendingOrder">
                  <button class="ot-btn ot-btn-close" @click="deletePendingOrder">
                    Eliminar orden #{{ editingPendingOrder ? editingPendingOrder.ticket : '' }}
                  </button>
                </div>



              </div>
            </div>

            <!-- PANEL RESULTADO DE ORDEN (CUBRE TODO EL TRADING-FORM) -->
            <div v-if="showTradingForm && showOrderResultPanel" 
              class="tf-result-overlay">

              <div class="tf-result-card">
                <!-- Header: título + X igual al trading-form -->
                <div class="tf-result-header">
                  <div class="tf-result-title">
                    #{{ orderResultPanel.ticket }}
                    <span
                      :class="{
                        'alert-side-buy': orderResultPanel.side === 'buy',
                        'alert-side-sell': orderResultPanel.side === 'sell'
                      }"
                      style="margin-left: 4px;">
                      {{ orderResultPanel.sideLabel || orderResultPanel.side }}
                    </span>
                    {{ orderResultPanel.volume }} {{ orderResultPanel.symbol }} at {{ orderResultPanel.price }}
                  </div>

                  <!-- X con el mismo estilo que la del trading-form -->
                  <button
                    class="ot-close tf-result-close"
                    @click="closeOrderResultPanel">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <!-- Cuerpo -->
                <div class="tf-result-body">
                  <div class="tf-result-status">
                    {{ orderResultPanel.status }}
                  </div>

                  <button
                    type="button"
                    class="tf-result-ok"
                    @click="closeOrderResultPanel">
                    OK
                  </button>
                </div>
              </div>
            </div>

          </section>

          <section id="chart" class="chart mobile-section" v-show="isMobile ? mobileActiveView === 'chart' : true">

            <div class="chart-top-left-box" v-if="showMarketForm" :class="{ 'trading-form--readonly': isInvestor }">
                <span class="symbol-name"></span>
                <!-- QUICK FORM (como la imagen 1) -->
                <div class="tf-quick-row">
                  <!-- LADO SELL -->
                  <div class="tf-quick-side tf-quick-side-sell">
                    <button class="tf-quick-block tf-quick-price" @click="placeMarketOrder('sell', quickVolume, true)">
                      {{ formatPrice(activeBid, activeInstrumentSymbol || undefined) }}
                    </button>
                    <button class="tf-quick-block tf-quick-label" @click="placeMarketOrder('sell', quickVolume, true)">
                      SELL
                    </button>
                  </div>

                  <!-- VOLUMEN CENTRAL 2 -->
                  <div class="ot-stepper2 ot-stepper-lg2">
                      <button class="ot-step-btn2" @click="decrementQuickVolume">
                        <i class="fa-solid fa-angle-down"></i>
                      </button>
                      <input
                          class="ot-step-value-input2"
                          type="number"
                          step="0.01"
                          min="0.01"
                          v-model.number="quickVolume"
                      />
                      <button class="ot-step-btn2" @click="incrementQuickVolume">
                        <i class="fa-solid fa-angle-up"></i>
                      </button>
                  </div>

                  <!-- LADO BUY -->
                  <div class="tf-quick-side tf-quick-side-buy">
                    <button class="tf-quick-block tf-quick-label" @click="placeMarketOrder('buy', quickVolume, true)">
                      BUY
                    </button>
                    <button class="tf-quick-block tf-quick-price" @click="placeMarketOrder('buy', quickVolume, true)">
                      {{ formatPrice(activeAsk, activeInstrumentSymbol || undefined) }}
                    </button>
                  </div>
                </div>
            </div>

            <div class="chart-top-banner">
              <div class="btn-row">
                <button class="fa-btn" @click="toggleMarketForm">
                  <i
                    class="fa-solid fa-object-ungroup dual-icon"
                    :class="{ 'dual-icon--active': showMarketForm }"
                  ></i>
                </button>


                <button class="fa-btn btn-hide" @click="toggleTradingForm">
                  <i class="fa-regular fa-clock dual-icon" 
                    :class="{ 'dual-icon--active': showTradingForm }"></i>
                  <span>New order</span>
                </button>

                <button class="fa-btn btn-hide" @click="toggleWatchlist">
                  <i class="fa-solid fa-table-list dual-icon"
                      :class="{ 'dual-icon--active': showWatchlist }"></i>
                </button>
              </div>
            </div>

            <div class="tv-chart">

              <!-- CONTENEDOR TRADINGVIEW -->
              <div ref="tvWidgetContainer"
                class="tradingview-widget-container"
                style="height: 100%; width: 100%;"
              >
                <div
                  ref="tvWidget"
                  class="tradingview-widget-container__widget"
                  style="height: calc(100% - 32px); width: 100%;"
                ></div>
              </div>

            </div>

            <!-- ===== ALERTS DE OPERACIONES (BOTTOM-LEFT) ===== -->
            <div class="trade-alerts-wrapper">
              <transition-group name="trade-alert-fade">
                <div
                  v-for="alert in tradeAlerts"
                  :key="alert.id"
                  class="trade-alert"
                  :class="[
                    `trade-alert--${alert.kind}`,
                    alert.side === 'buy' ? 'trade-alert--buy' : '',
                    alert.side === 'sell' ? 'trade-alert--sell' : ''
                  ]"
                >
                  <div class="trade-alert__title">
                    <!-- El símbolo queda normal -->
                    {{ alert.title.split(' ')[0] }}
                    <!-- lado (buy/sell) con color -->
                    <span
                      :class="{
                        'alert-side-buy': alert.side === 'buy',
                        'alert-side-sell': alert.side === 'sell'
                      }"
                      style="margin-left: 4px;"
                    >
                      {{ alert.sideLabel }}
                    </span>
                  </div>

                  <div class="trade-alert__text">
                    {{ alert.text }}
                    <!-- pill de 'Terminado' cuando aplique -->
                    <span
                      v-if="alert.status"
                      class="trade-alert__status"
                    >
                      {{ alert.status }}
                    </span>
                  </div>
                </div>
              </transition-group>
            </div>

          </section>

          <section id="watchlist" class="watchlist mobile-section"
            v-show="isMobile ? mobileActiveView === 'markets' : showWatchlist"> <!-- :class="{ 'trading-form--readonly': isInvestor }" -->

            <div ref="handleLeft" class="resize-handle resize-handle-left"></div>

            <!-- Search bar -->
            <div class="wl-search-bar" :class="{ 'trading-form--readonly': isInvestor }">
              <i class="fa-solid fa-magnifying-glass wl-search-icon"></i>
              <input
                type="text"
                class="wl-search-input"
                placeholder="Search symbol"
              />
            </div>

            <!-- MARKET WATCH -->

            <!-- Encabezado -->
            <div class="mw-row mw-header">
              <div class="mw-cell mw-symbol-head">Symbol</div>
              <div class="mw-cell">Bid</div>
              <div class="mw-cell">Ask</div>
              <div class="mw-cell mw-right">Change</div>
            </div>

            <div class="mw-body">

              <div class="mw-row mw-row-active mw-row2"
                v-for="row in watchlistRows"
                :key="row.symbol"
                :class="['watchlist-row', { active: row.symbol === activeInstrumentSymbol }]"
                @click="onWatchlistRowClick(row.symbol)">

                <div class="mw-cell mw-symbol">
                  <i class="fa-solid"
                    :class="
                      row.direction === 'up'
                        ? 'fa-caret-up mw-icon-up'
                        : row.direction === 'down'
                        ? 'fa-caret-down mw-icon-down'
                        : 'fa-circle-dot mw-icon-neutral'
                    "
                  ></i>
                  <span>{{ row.symbol }}</span>
                </div>

                <div class="mw-cell"
                  :class="row.direction === 'up'
                            ? 'mw-bid-up'
                            : row.direction === 'down'
                            ? 'mw-bid-down'
                            : ''">
                  {{ formatPrice(row.bid, row.symbol) }}
                </div>

                <div class="mw-cell"
                  :class="row.direction === 'up'
                            ? 'mw-ask-up'
                            : row.direction === 'down'
                            ? 'mw-ask-down'
                            : ''">
                  {{ formatPrice(row.ask, row.symbol) }}
                </div>

                <div class="mw-cell mw-right mw-change-up">%</div>
              </div>

            </div>

          </section>


          <section class="mobile-section hide-section-dp"
            v-show="mobileActiveView === 'positions'">
            <div class="positions-mobile">

              <!-- OPEN + PENDING -->
              <div v-if="activePositionsTab === 'orders'" class="pm-list">

                <!-- ================= OPEN POSITIONS ================= -->
                <div v-for="pos in openPositions"
                  :key="pos.id"
                  class="pm-card"
                  @click="onPositionClick(pos)"
                  @dblclick="onPositionDblClick(pos)">

                  <!-- HEADER -->
                  <div class="pm-header">
                    <span class="pm-symbol">{{ pos.symbol }}</span>

                    <span class="pm-type"
                      :class="{
                        'pm-buy': pos.side === 'buy',
                        'pm-sell': pos.side === 'sell'
                      }">
                      {{ pos.side.toUpperCase() }}
                    </span>

                    <span class="pm-profit"
                      :class="{
                        'pm-profit-pos': (getOpenPositionProfit(pos) ?? 0) > 0,
                        'pm-profit-neg': (getOpenPositionProfit(pos) ?? 0) < 0
                      }">
                      {{ formatProfit(getOpenPositionProfit(pos)) }}
                    </span>
                  </div>

                  <!-- BODY -->
                  <div class="pm-body">

                    <div class="pm-row">
                      <span>Volume</span>
                      <span>{{ pos.quantity_lots }}</span>
                    </div>

                    <div class="pm-row">
                      <span>Open</span>
                      <span>{{ formatPrice(pos.avg_entry_price, pos.symbol) }} / {{ formatPrice(getMarketPriceForPosition(pos), pos.symbol) }}</span>
                    </div>

                    <div class="pm-row pm-sl-tp">
                      <span>SL</span>
                      <span>
                        {{ pos.stop_loss ? formatPrice(pos.stop_loss, pos.symbol) : '' }}
                      </span>
                    </div>

                    <div class="pm-row pm-sl-tp">
                      <span>TP</span>
                      <span>
                        {{ pos.take_profit ? formatPrice(pos.take_profit, pos.symbol) : '' }}
                      </span>
                    </div>

                  </div>

                  <!-- ACTION -->
                  <div class="pm-action">
                    <button class="pm-btn pm-btn-close"
                      @click.stop="closePosition(pos)">
                      X
                    </button>
                  </div>

                </div>

                
                <!-- ================= ACCOUNT SUMMARY (MOBILE) ================= -->
                <div class="pm-account-summary">
                  <div class="pm-summary-grid">
                    <div>
                      <span class="pm-summary-label">Balance</span>
                      <span class="pm-summary-value">
                        {{ formatMoney(getActiveAccountBalance()) }}
                      </span>
                    </div>
                    <div>
                      <span class="pm-summary-label">Equity</span>
                      <span class="pm-summary-value">
                        {{ formatMoney(getAccountEquity()) }}
                      </span>
                    </div>
                    <div>
                      <span class="pm-summary-label">Margin</span>
                      <span class="pm-summary-value">
                        {{ formatMoney(getTotalMargin()) }}
                      </span>
                    </div>
                    <div>
                      <span class="pm-summary-label">Free</span>
                      <span class="pm-summary-value">
                        {{ formatMoney(getFreeMargin()) }}
                      </span>
                    </div>
                  </div>
                  <div class="pm-summary-profit">
                    <span class="pm-summary-label">Level</span>
                    <span class="pm-summary-level">
                      {{ getMarginLevel().toFixed(2) }}%
                    </span>
                    <span class="pm-summary-currency">USD</span>
                    <span class="pm-summary-profit-value"
                      :class="{
                        'pm-profit-pos': getTotalOpenProfit() > 0,
                        'pm-profit-neg': getTotalOpenProfit() < 0
                      }">
                      {{ formatProfit(getTotalOpenProfit()) }}
                    </span>
                  </div>
                </div>


                <!-- ================= PENDING ORDERS ================= -->
                <div v-for="ord in pendingOrders"
                  :key="ord.id"
                  class="pm-card pm-card--pending"
                  @click="onPendingClick(ord)"
                  @dblclick="onPendingDblClick(ord)">

                  <!-- HEADER -->
                  <div class="pm-header">
                    <span class="pm-symbol">{{ ord.symbol }}</span>
                    <span class="pm-type">{{ formatOrderType(ord) }}</span>
                    <span class="pm-status">Pending</span>
                  </div>

                  <!-- BODY -->
                  <div class="pm-body">
                    <div class="pm-row">
                      <span>Volume</span>
                      <span>{{ ord.quantity_lots }}</span>
                    </div>
                    <div class="pm-row">
                      <span>Price</span>
                      <span>{{ formatPrice(ord.price || ord.stop_price, ord.symbol) }}</span>
                    </div>
                    <div class="pm-row pm-sl-tp">
                      <span>SL</span>
                      <span>
                        {{ ord.stop_loss ? formatPrice(ord.stop_loss, ord.symbol) : '' }}
                      </span>
                    </div>
                    <div class="pm-row pm-sl-tp">
                      <span>TP</span>
                      <span>
                        {{ ord.take_profit ? formatPrice(ord.take_profit, ord.symbol) : '' }}
                      </span>
                    </div>
                  </div>

                  <!-- ACTION -->
                  <div class="pm-action">
                    <button class="pm-btn pm-btn-cancel"
                      @click.stop="cancelPendingOrder(ord)">
                      X
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <section class="mobile-section hide-section-dp"
            v-show="mobileActiveView === 'history'">
            <div class="positions-mobile">

              <div class="pm-list">

                <!-- ================= HISTORY ROWS ================= -->
                <div v-for="row in historyRows"
                  :key="row.ticket"
                  class="pm-card pm-card--history">

                  <!-- HEADER -->
                  <div class="pm-header">
                    <span class="pm-symbol">{{ row.symbol || 'Balance' }}</span>

                    <span class="pm-type"
                      :class="{
                        'pm-buy': row.type.toLowerCase().includes('buy'),
                        'pm-sell': row.type.toLowerCase().includes('sell')
                      }">
                      {{ row.type }}
                    </span>

                    <span class="pm-profit"
                      :class="{
                        'pm-profit-pos': Number(row.profit) > 0,
                        'pm-profit-neg': Number(row.profit) < 0
                      }">
                      {{ formatProfit(row.profit) }}
                    </span>
                  </div>

                  <!-- BODY -->
                  <div class="pm-body">
                    <div class="pm-row">
                      <span>Volume</span>
                      <span>{{ row.volumeText }}</span>
                    </div>
                    <div class="pm-row">
                      <span>Open</span>
                      <span>{{ row.priceOpen }}</span>
                    </div>
                    <div class="pm-row">
                      <span>Close</span>
                      <span>{{ row.priceClose }}</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </section>

        </div>

        <!-- POSITIONS -->
        <section id="positions" class="positions" v-show="activePositionsTab"> <!-- :class="{ 'trading-form--readonly': isInvestor }" -->
          <div ref="handleTop" class="resize-handle resize-handle-top"></div>
          
          <div class="pos-table-container">
            <div class="pos-table-scroll">

              <div v-if="activePositionsTab === 'orders'" class="positions-panel">
                <table class="pos-table">

                  <thead>
                    <tr>
                      <th class="col-symbol">Symbol</th>       <!-- 1 -->
                      <th class="col-ticket">Ticket</th>       <!-- 2 -->
                      <th class="col-time">Date</th>           <!-- 3 -->
                      <th class="col-type">Type</th>           <!-- 4 -->
                      <th class="col-volume">Volume</th>       <!-- 5 -->
                      <th class="col-price-open">Price</th>    <!-- 6 -->
                      <th class="col-sl">S / L</th>            <!-- 7 -->
                      <th class="col-tp">T / P</th>            <!-- 8 -->
                      <th class="col-price-current">Price</th> <!-- 9 -->
                      <th class="col-swap">Swap</th>           <!-- 10 -->
                      <th class="col-profit">Profit</th>       <!-- 11 -->
                      <th class="col-comment">Comment</th>  
                      <th class="col-extra1"></th>             <!-- 13 -->
                      <th class="col-extra2"></th>             <!-- 14 -->
                    </tr>
                  </thead>

                  <tbody>
                    <!-- ===== OPEN POSITIONS ===== -->
                    <tr class="pos-row" v-if="activeSubAccount"
                      v-for="pos in openPositions"
                      :key="pos.id"
                      @click="onPositionClick(pos)"
                      @dblclick="onPositionDblClick(pos)">
                      <td class="col-symbol">{{ pos.symbol || '-' }}</td>
                      <td class="col-ticket">{{ shortTicket(pos.ticket) }}</td>
                      <td class="col-time">{{ pos.datetext ? pos.datetext : formatDateTime(new Date()) }}</td>
                      <td class="col-type"
                        :class="{
                          'pos-type-buy': pos.side === 'buy',
                          'pos-type-sell': pos.side === 'sell'
                        }">{{ pos.side }}</td>
                      <td class="col-volume">{{ pos.quantity_lots }}</td>
                      <td class="col-price-open">{{ formatPrice(pos.avg_entry_price, pos.symbol) }}</td>

                      <td class="col-sl">
                        <!-- Botón X SOLO si hay SL -->
                        <button
                          v-if="pos.stop_loss != null"
                          class="close-mini-btn"
                          @click.stop="clearPositionSL(pos)"
                        >
                          ✕
                        </button>
                        <!-- Valor (o '-') -->
                        <span class="sl-value">
                          {{ pos.stop_loss ?? '' }}
                        </span>
                      </td>
                      <td class="col-tp">
                        <!-- Botón X SOLO si hay TP -->
                        <button
                          v-if="pos.take_profit != null"
                          class="close-mini-btn"
                          @click.stop="clearPositionTP(pos)"
                        >
                          ✕
                        </button>
                        <!-- Valor (o '-') -->
                        <span class="tp-value">
                          {{ pos.take_profit ?? '' }}
                        </span>
                      </td>

                      <td class="col-price-current">{{ formatPrice(getMarketPriceForPosition(pos), pos.symbol) }}</td>
                      <td class="col-swap"> {{ pos.swaptext }} </td>
                      <td class="col-profit"
                        :class="{
                          'pos-profit-pos': (getOpenPositionProfit(pos) ?? 0) > 0,
                          'pos-profit-neg': (getOpenPositionProfit(pos) ?? 0) < 0,
                        }">
                        {{ formatProfit(getOpenPositionProfit(pos)) }}
                      </td>
                      <td class="col-comment">{{ pos.comment || '' }}</td>
                      <!-- columnas 13 y 14 vacías -->
                      <td class="col-extra1"></td>
                      <td class="col-close">
                          <button class="close-big-btn" @click="closePosition(pos)">×</button>
                      </td>
                    </tr>

                    <!-- ===== Fila resumen (celdas combinadas) ===== -->
                    <tr class="pos-summary-row">
                      <td colspan="9">
                        Balance: {{ formatMoney(getActiveAccountBalance()) }}&nbsp;&nbsp;
                        Equity: {{ formatMoney(getAccountEquity()) }}&nbsp;&nbsp;
                        Margin: {{ formatMoney(getTotalMargin()) }}&nbsp;&nbsp;
                        Free margin: {{ formatMoney(getFreeMargin()) }}&nbsp;&nbsp;
                        Level: {{ getMarginLevel().toFixed(2) }}%
                      </td>
                      <td class="col-swap"><span v-if="!isInvestor">-441 697.47</span></td>
                      <td class="col-profit pos-profit-neg">{{ formatProfit(getTotalOpenProfit()) }}</td>
                      <td class="col-comment"
                        :class="{
                          'usd-pos': getTotalOpenProfit() > 0,
                          'usd-neg': getTotalOpenProfit() < 0
                        }">USD</td>
                      <!-- 13 y 14 vacías -->
                      <td class="col-extra1"></td>
                      <td class="col-extra2"></td>
                    </tr>

                    <!-- ===== PENDING POSITIONS ===== -->
                    <tr class="pos-row" v-if="activeSubAccount"
                      v-for="ord in pendingOrders"
                      :key="ord.id"
                      @click="onPendingClick(ord)"
                      @dblclick="onPendingDblClick(ord)">
                      <td class="col-symbol">{{ ord.symbol || 'EURUSD' }} <!-- luego lo conectamos bien al instrumento --></td>
                      <td class="col-ticket">{{ shortTicket(ord.ticket) }}</td>
                      <td class="col-time">{{ formatDateTime(ord.placed_at) }}</td>
                      <td class="col-type">{{ formatOrderType(ord) }}</td>
                      <td class="col-volume">{{ ord.quantity_lots }}</td>
                      <td class="col-price-open">{{ formatPrice(ord.price || ord.stop_price, ord.symbol) }}</td>
                      <td class="col-sl">{{ ord.stop_loss ?? '' }}</td>
                      <td class="col-tp">{{ ord.take_profit ?? '' }}</td>
                      <td class="col-price-current">{{ formatPendingMarketPrice(ord) }}</td>
                      <td class="col-swap"></td>
                      <td class="col-profit">{{ formatPendingStatus(ord) }}</td>
                      <td class="col-comment">{{ ord.comment || '' }}</td>
                      <!-- columnas 13 y 14 vacías -->
                      <td class="col-extra1"></td>
                      <td class="col-close">
                          <button class="close-big-btn" @click="cancelPendingOrder(ord)">×</button>
                      </td>
                    </tr>
                  </tbody>

                </table>
              </div>

              <div v-else-if="activePositionsTab === 'history'" class="positions-panel">
                <!-- HISTORY -->
                <table class="positions-table2">

                  <thead>
                    <tr>
                      <th class="col-time2">Time</th>
                      <th class="col-ticket2">Ticket</th>
                      <th class="col-type2">Type</th>
                      <th class="col-volume2">Volume</th>
                      <th class="col-symbol2">Symbol</th>
                      <th class="col-price2">Price</th>
                      <th class="col-sl2">S / L</th>
                      <th class="col-tp2">T / P</th>
                      <th class="col-time-dup2">Time</th>
                      <th class="col-price-dup2">Price</th>
                      <th class="col-commission2">Commission</th>
                      <th class="col-fee2">Fee</th>
                      <th class="col-swap2">Swap</th>
                      <th class="col-profit2">Profit</th>
                      <th class="col-comment">Comment</th> 
                    </tr>
                  </thead>

                  <tbody>
                    <!-- ======= FILA NORMAL ======= -->
                    <tr v-for="row in historyRows" :key="row.ticket" class="his-row">
                      <td class="col-time2">{{ formatDateTime(row.timeOpen) }}</td>
                      <td class="col-ticket2">{{ shortTicket(row.ticket) }}</td>
                      <td class="col-type2"
                        :class="{
                          'pos-type-buy2': row.type && row.type.toLowerCase().includes('buy'),
                          'pos-type-sell2': row.type && row.type.toLowerCase().includes('sell')
                        }">{{ row.type }}</td>
                      <td class="col-volume2">{{ row.volumeText }}</td>
                      <td class="col-symbol2">{{ row.symbol }}</td>
                      <td class="col-price2">{{ row.priceOpen }}</td>
                      <td class="col-sl2">{{ row.sl }}</td>
                      <td class="col-tp2">{{ row.tp }}</td>
                      <td class="col-time-dup2">{{ formatDateTime(row.timeClose) }}</td>
                      <td class="col-price-dup2">{{ row.priceClose }}</td>
                      <td class="col-commission2">{{ row.commission }}</td>
                      <td class="col-fee2">{{ row.fee }}</td>
                      <td class="col-swap2">{{ row.swap }}</td>
                      <td class="col-profit2"
                        :class="{
                          'pos-profit-pos2': Number(row.profit) > 0,
                          'pos-profit-neg2': Number(row.profit) < 0
                        }">
                        {{ formatProfit(row.profit) }}
                      </td>
                      <td class="col-extra2">{{ row.comment }}</td>  
                    </tr>

                    <!-- ======= FILA RESUMEN (COMBINACIÓN) ======= -->
                    <tr class="pos-summary-row2">
                      <!-- primeras 11 columnas -->
                      <td colspan="11" class="summary-text2">
                        Profit: {{ formatMoney(historySummary.profit) }}&nbsp;&nbsp;
                        Credit: {{ formatMoney(historySummary.credit) }}&nbsp;&nbsp;
                        Deposit: {{ formatMoney(historySummary.deposit) }}&nbsp;&nbsp;
                        Withdrawal: {{ formatMoney(historySummary.withdrawal) }}&nbsp;&nbsp;
                        Balance: {{ formatMoney(getActiveAccountBalance()) }}
                      </td>

                      <!-- columnas 12,13,14 alineadas -->
                      <td class="col-fee2">{{ formatMoney(historySummary.fee) }}</td>
                      <td class="col-swap2">{{ formatMoney(historySummary.swap) }}</td>
                      <td class="col-profit2">{{ formatProfit(historySummary.net) }}</td>
                      <td class="col-extra2"></td>
                    </tr>


                  </tbody>

                </table>
              </div>

              <div v-else-if="activePositionsTab === 'journal'" class="positions-panel">
                <!-- JOURNAL -->
                <table class="positions-table2">

                  <thead>
                    <tr>
                      <th class="col-time2">Time</th>
                      <th class="col-source">Source</th>
                      <th class="col-message">Message</th>
                      <th class="col-volume2"></th>
                      <th class="col-symbol2"></th>
                      <th class="col-price2"></th>
                      <th class="col-sl2"></th>
                      <th class="col-tp2"></th>
                      <th class="col-time-dup2"></th>
                      <th class="col-price-dup2"></th>
                      <th class="col-commission2"></th>
                      <th class="col-fee2"></th>
                      <th class="col-swap2"></th>
                      <th class="col-profit2"></th>
                      <th class="col-comment"></th> 
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="row in journalRows"
                      :key="row.id"
                      class="journal-row">
                      <!-- Time -->
                      <td class="col-time2">
                        {{ formatDateTime(row.time) }}
                      </td>
                      <!-- Source -->
                      <td class="col-source">
                        {{ row.source }}
                      </td>
                      <!-- Message ocupa TODO el resto -->
                      <td
                        class="col-message journal-message"
                        colspan="13">
                        {{ row.message }}
                      </td>
                    </tr>
                  </tbody>


                </table>
              </div>

            </div>
          </div>

        </section>

        <!-- ===== MAIN MENU OVERLAY ===== -->
        <div v-if="showMainMenu" class="mm-overlay mm-overlay--mobile" @click.self="closeMainMenu">
          <div class="mm-panel">
            <!-- Header cuenta -->
            <div class="mm-header">
              <div class="mm-header-main">
                <div class="mm-name">{{ currentUser.email }}</div>
                <div class="mm-account">{{ mmAccountLine }}</div>
              </div>
              <div class="mm-badge">Real</div>
            </div>

            <!-- Lista principal -->
            <ul class="mm-list">

              <li class="mm-item mm-item-chart-settings">
                <div class="mm-left">
                  <i class="fa-regular fa-user-circle mm-icon"></i>
                  <span class="mm-label">Trading accounts</span>
                </div>
                <i class="fa-solid fa-chevron-right mm-arrow"></i>

                <!-- Subpanel -->
                <div class="mm-subpanel">

                  <div class="mm-sub-item mm-sub-title">
                    <div class="mm-left">
                      <i class="fa-solid fa-border-all mm-icon"></i>
                      <span class="mm-label">Real account</span>
                    </div>
                  </div>

                  <!-- 🆕 LISTADO DE CUENTAS (SUBPANEL TRADING ACCOUNTS) -->
                  <div v-if="subAccounts && subAccounts.length" class="mm-sub-accounts" @click="openAccountsModal">

                    <div v-for="acc in subAccounts"
                      :key="acc.id"
                      class="mm-sub-account-item"
                      :class="{
                        'mm-sub-account-item--active':
                          acc.id === (selectedSubAccountId || activeAccountId)
                      }"
                      @click.stop="handleUiSelectSubAccount(acc);
                                  openAccountsModal();">
                      <!-- TOP -->
                      <div class="mm-sub-account-top">
                        <i class="fa-solid fa-user-group mm-sub-account-icon"></i>

                        <span class="mm-sub-account-name">
                          {{ acc.owner_name || currentUser?.email || 'Account' }}
                        </span>
                      </div>

                      <!-- BOTTOM -->
                      <div class="mm-sub-account-bottom">
                        <span class="mm-sub-account-login">
                          {{ acc.login || acc.account_number }}
                        </span>

                        <span class="mm-sub-account-balance">
                          {{ formatMoney(acc.balance || 0) }}
                          {{ acc.currency || 'USD' }}
                        </span>
                      </div>

                    </div>
                  </div>


                  <div class="mm-sub-item" v-if="!isInvestor">
                    <div class="mm-left">
                      <i class="fa-solid fa-arrow-right-arrow-left mm-icon"></i>
                      <span class="mm-label">Demo account</span>
                    </div>
                  </div>
                </div>

              </li>

              <li class="mm-item mm-item-chart-settings">
                <a href="https://es.tradingview.com/economic-calendar"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mm-left"
                  style="text-decoration: none; color: inherit;">
                  <i class="fa-regular fa-calendar-days mm-icon"></i>
                  <span class="mm-label">Economic Calendar</span>
                </a>
              </li>


              <li class="mm-item mm-item-chart-settings">
                <div class="mm-left">
                  <i class="fa-solid fa-language mm-icon"></i>
                  <span class="mm-label">Language</span>
                </div>
                <div class="mm-right-inline">
                  <span class="mm-lang">EN</span>
                  <i class="fa-solid fa-chevron-right mm-arrow"></i>

                  <!-- Subpanel -->
                  <div class="mm-subpanel">
                    <div class="mm-sub-item mm-sub-title">
                      <div class="mm-left">
                        <span class="mm-label">English</span>
                      </div>
                      <i class="fa-solid fa-check mm-arrow"></i>
                    </div>
                  </div>

                </div>
              </li>
            </ul>

          </div>
        </div>

      </div>

      <!-- ================= MOBILE BOTTOM BAR ================= -->
      <nav class="mobile-bottom-bar">

        <button
          class="mbb-item"
          :class="{ 'mbb-item--active': mobileActiveView === 'chart' && !showMainMenu }"
          @click="setMobileView('chart')"
        >
          <i class="fa-solid fa-chart-line"></i>
          <span>Chart</span>
        </button>

        <button
          class="mbb-item"
          :class="{ 'mbb-item--active': mobileActiveView === 'trade' && !showMainMenu }"
          @click="setMobileView('trade')"
        >
          <i class="fa-solid fa-arrow-right-arrow-left"></i>
          <span>Trade</span>
        </button>

        <button
          class="mbb-item"
          :class="{ 'mbb-item--active': mobileActiveView === 'markets' && !showMainMenu }"
          @click="setMobileView('markets')"
        >
          <i class="fa-solid fa-chart-area"></i>
          <span>Markets</span>
        </button>

        <button
          class="mbb-item"
          :class="{ 'mbb-item--active': mobileActiveView === 'positions' && !showMainMenu }"
          @click="setMobileView('positions')"
        >
          <i class="fa-solid fa-list-ul"></i>
          <span>Positions</span>
        </button>

        <button
          class="mbb-item"
          :class="{ 'mbb-item--active': mobileActiveView === 'history' && !showMainMenu }"
          @click="setMobileView('history')"
        >
          <i class="fa-solid fa-clock-rotate-left"></i>
          <span>History</span>
        </button>

        <button
          class="mbb-item"
          :class="{ 'mbb-item--active': showMainMenu }"
          @click="openMobileAccountMenu"
        >
          <i class="fa-solid fa-user"></i>
          <span>Account</span>
        </button>

      </nav>



    </div>

  </div>

</div>


</template>




<script lang="ts">
/* =========================== IMPORTS ========================== */
import { supabase } from './lib/supabaseClient'


/* ======================== PRICE ENGINE ======================== */
import {
  connectPriceStream,
  onPriceTick,
  getLastPrice,
  type PriceTick,
} from './services/priceEngine'

interface Instrument {
  id: string;
  symbol: string;
  symbol_tradingview?: string;
  // aquí puedes ir añadiendo más campos si quieres tiparlos
}

// =========================================================
// FORMAT: miles con espacio + punto decimal (ej: 1 000 000.00)
// =========================================================

// normaliza espacios raros de Intl (NBSP / NNBSP) a espacio normal
function normalizeSpaces(s: string): string {
  return s.replace(/\u00A0/g, ' ').replace(/\u202F/g, ' ');
}

// cache por decimales (mejor performance)
const nfCache = new Map<number, Intl.NumberFormat>();

function getNF(decimals: number): Intl.NumberFormat {
  const d = Math.max(0, Math.min(12, Math.floor(decimals || 0)));
  const cached = nfCache.get(d);
  if (cached) return cached;

  // fr-FR: separa miles con espacio y decimales con coma
  const nf = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });

  nfCache.set(d, nf);
  return nf;
}

function formatSpaceNumber(value: any, decimals: number): string {
  if (value === null || value === undefined || value === '') return '-';

  const n = Number(value);
  if (!Number.isFinite(n)) return '-';

  // "1 000 000,00" -> normaliza espacios -> "1 000 000,00" -> cambia coma decimal a punto
  const s = normalizeSpaces(getNF(decimals).format(n));
  return s.replace(',', '.');
}


/* ==================================================================
=====================================================================
EXPORT DEFAULT 
=====================================================================
================================================================== */
export default {
  name: 'TraderoomApp',


  data() {
    return {
      positionDateFallback: {} as Record<string | number, string>,
      // AUTH SUPABASE
      authEmail: '' as string,
      authPassword: '' as string,
      authMode: 'login' as 'login' | 'signup',
      authLoading: false as boolean,
      authError: null as string | null,

      // LOADING PAGE
      tvLoading: false,
      tvInitialLoadDone: false as boolean,

      // CONTEXTO TRADING
      currentUser: null as any, // luego si quieres lo cambiamos a User de Supabase
      authReady: false,

      activeAccountId: null as string | number | null,
      activeInstrumentId: null as string | number | null,
      activeInstrumentSymbol: null as string | null, // CAMBIO
      activeInstrumentTvSymbol: null as string | null,
      editingMode: null as string | null, // CAMBIO
      destroyResizers: null as null | (() => void),

      // MODAL CUENTAS
      showAccountsModal: false as boolean,   // luego lo conectas a un botón para abrir/cerrar
      accountsTab: 'login' as 'login' | 'demo' | 'real' | 'account',

      // SHOW MENU, TRADING FORM, WATCHLIST
      showMainMenu: false as boolean,
      showTradingForm: false as boolean, // TRADINGFORM - SHOW, CLOSE
      showWatchlist: false as boolean, // WATCHLIST - SHOW, CLOSE

      // TRADING FORM INPUTS
      orderType: 'market' as
        | 'market'
        | 'buy_limit'
        | 'sell_limit'
        | 'buy_stop'
        | 'sell_stop'
        | 'buy_stop_limit'
        | 'sell_stop_limit',
      showVolume: true as boolean,
      showVolumePrice: false as boolean,
      showPriceStopLimit: false as boolean,
      showSLTP: true as boolean,
      showExpiration: false as boolean,
      showComment: true as boolean,
      showSellBuyMarket: true as boolean,
      showPlaceOrderBuy: false as boolean,
      showPlaceOrderSell: false as boolean,

      // TRADING FORM VALUES (datos reales de la orden)
      quickVolume: 0.01 as number, // MARKETFORM
      volume: 0.01 as number,
      price: null as number | null,
      stopLimitPrice: null as number | null,
      stopLoss: null as number | null,
      takeProfit: null as number | null,
      expirationType: 'gtc' as 'gtc' | 'today' | 'specified' | 'day',
      orderComment: '' as string,
      tradingLoading: false as boolean,
      tradingError: null as string | null,

      // PRECIOS BID ASK TRADING FORM
      bidDirection: 'neutral' as 'up' | 'down' | 'neutral',
      askDirection: 'neutral' as 'up' | 'down' | 'neutral',
      digitsBySymbol: {} as Record<string, number>,

      // SECTION POSITIONS         
      activePositionsTab: 'orders' as 'orders' | 'history' | 'journal' | null,

      // OPEN POSITIONS 
      openPositions: [] as any[],
      openPositionsLoading: false as boolean,
      openPositionsError: null as string | null,

      // PENDING POSITIONS 
      pendingOrders: [] as any[],
      pendingOrdersLoading: false as boolean,
      pendingOrdersError: null as string | null,

      // EDITAR OPEN POSITIONS Y PENDING POSITIONS
      editingPosition: null as any,
      editingPendingOrder: null as any,
      originalPendingForm: null as {
        volume: number;
        price: number | null;
        stopLimitPrice: number | null;
        stopLoss: number | null;
        takeProfit: number | null;
        orderComment: string;
        expirationType: string;
      } | null,
      showModifyButton: false as boolean,
      showClosePositionButton: false as boolean,
      showDeletePendingButton: false as boolean,
      
      // HISTORY 
      historyRows: [] as any[],
      historyLoading: false as boolean,
      historyError: null as string | null,

      // ALERTS DE OPERACIONES
      tradeAlerts: [] as any[],

      // DIV DE TRADINGFORM DE OPERACIONES
      showOrderResultPanel: false as boolean,
      orderResultPanel: {
        ticket: null,
        side: null,
        sideLabel: '',
        volume: null,
        symbol: '',
        price: null,
        status: 'Terminado',
      } as {
        ticket: number | string | null;
        side: 'buy' | 'sell' | null;
        sideLabel: string;
        volume: number | null;
        symbol: string;
        price: number | string | null;
        status: string;
      },

      // ERRORES DE TRADINGFORM
      formErrorMessage: null as string | null,

      // PRECIOS EN TIEMPO REAL (mapa por símbolo)
      watchlistSymbols: [] as string[],
      pricesBySymbol: {} as Record<string, PriceTick>,
      
      // Solo para debug en consola
      lastTick: null as PriceTick | null,

      // WATCHLIST SEARCH
      watchlistSearch: '' as string,
      watchlistDropdownOpen: false as boolean,

      // WATCHLIST: PRECIOS REALES Y SINTÉTICOS
      realTicksBySymbol: {} as Record<string, PriceTick>,   // último tick real por símbolo
      prevRealTicksBySymbol: {} as Record<string, PriceTick>, // penúltimo tick real
      priceAnimationIntervalId: null as number | null,      // setInterval para mover precios

      // 👇 WATCHLIST: digits por símbolo (EURUSD -> 5, XAUUSD -> 3, etc.)
      spreadMinBySymbol: {} as Record<string, number | null>,
      spreadMaxBySymbol: {} as Record<string, number | null>,

      // 👇 WATCHLIST: dirección del precio por símbolo ('up' | 'down' | 'flat')
      priceDirectionBySymbol: {} as Record<string, 'up' | 'down' | 'flat'>, 

      // 👇 tamaño de contrato por símbolo (ej: FX = 100000)
      contractSizeBySymbol: {} as Record<string, number>,

      // SUBACCOUNTS
      subAccounts: [] as any[],
      selectedSubAccountId: null as string | number | null, // cuenta seleccionada SOLO dentro del modal (para mostrar detalle)

      // TRADINGVIEW
      instruments: [] as Instrument[],

      // TRADINGVIEW – estado interno del widget
      tvWidget: null as any,
      tvScriptLoaded: false as boolean,
      chartLoading: true as boolean,

      // POSITIONS - HISTORY
      historySummary: {
        profit: 0,      // pnl cerrado (sin fee/swap si los separas)
        credit: 0,
        deposit: 0,
        withdrawal: 0,
        fee: 0,
        swap: 0,
        net: 0,         // profit + fee + swap (o como lo manejes)
      },

      // CHART MARKET FORM
      showMarketForm: false,

      // MOBILE RESPONSIVE
      isMobile: window.innerWidth <= 900,
      mobileActiveView: 'chart',

    };
  },


  methods: {

    // DESKTOP - MOBILE
    handleResize() {
      const nowMobile = window.innerWidth <= 900
      if (nowMobile !== this.isMobile) {
        this.isMobile = nowMobile
        if (!nowMobile) {
          // 👉 saliendo de mobile → restaurar estado desktop
          this.syncDesktopFromMobile()
        }
      }
    },
    syncDesktopFromMobile() {
      this.showTradingForm = this.mobileActiveView === 'trade'
      this.showWatchlist   = this.mobileActiveView === 'markets'
    },

    setMobileView(view: 'chart' | 'trade' | 'markets' | 'positions' | 'history') {
      this.mobileActiveView = view;
      this.showMainMenu = false; // 🔴 CIERRA ACCOUNT SIEMPRE
    },



    toggleMarketForm(): void {
      this.showMarketForm = !this.showMarketForm;
    },

    isSubAccountActive(acc: any): boolean {
      if (!acc) return false
      return acc.id === this.activeAccountId
    },

     getPositionDateText(pos: any): string {
      if (!pos) return '-'

      // 1️⃣ Si Supabase mandó datetext → se respeta
      if (pos.datetext) {
        return pos.datetext
      }

      // 2️⃣ Fallback congelado (MT5 style)
      const key = pos.id || pos.ticket

      if (!this.positionDateFallback[key]) {
        this.positionDateFallback[key] =
          this.formatDateTime(new Date())
      }

      return this.positionDateFallback[key]
    },

    syncTradingFormPrice(symbol: string) {
      const row = this.watchlistRows.find(r => r.symbol === symbol);
      if (!row) return;

      this.activeBid = row.bid;
      this.activeAsk = row.ask;
    },


    waitForVisibleContainer(el: HTMLElement): Promise<void> {
      return new Promise(resolve => {
        const check = () => {
          const w = el.clientWidth;
          const h = el.clientHeight;

          if (w > 100 && h > 100) {
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      });
    },


    /* ==================================================================
    Backdrop click (no cierra si no hay sesión)
    ================================================================== */
    onAccountsBackdropClick(): void {
      // si NO hay sesión, el modal es forzoso -> no se cierra
      if (!this.currentUser) return;

      this.showAccountsModal = false;
    },


    /* ==================================================================
    =====================================================================
    SUPABASE 
    =====================================================================
    ================================================================== */
    async checkSession(): Promise<void> {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error al obtener sesión:', error)
        return
      }

      // Tipado del usuario de Supabase
      this.currentUser = (data.session?.user ?? null) as {
        id: string
        email?: string
        [key: string]: any
      } | null

      if (this.currentUser) {
        console.log('Usuario logueado:', this.currentUser.email)

        await this.loadSubAccounts()            // CARGA SUBCUENTAS
        await this.loadDefaultTradingContext()
        await this.loadOpenPositions()          // CARGA OPEN POSITIONS
        await this.loadPendingOrders()          // CARGA PENDING POSITIONS
        await this.loadHistory()                // CARGA HISTORY

      } else {
        console.log('No hay sesión activa')
      }
    },


    /* ==================================================================
    SUPABASE - CONTEXTO POR DEFECTO (cuenta + instrumento)
    ================================================================== */
    async loadDefaultTradingContext(): Promise<void> {
      try {
        this.tradingError = null
        if (!this.currentUser) return

        // 1) Subcuenta por defecto (primera del usuario)
        const { data: subAcc, error: subErr } = await supabase
          .from('sub_accounts')
          .select('id')
          .eq('user_id', this.currentUser.id)
          .order('created_at', { ascending: true })
          .limit(1)
          .single()

        if (subErr) {
          console.error('No se pudo cargar subcuenta:', subErr)
          this.tradingError = 'No se encontró ninguna cuenta de trading para este usuario.'
          return
        }

        this.activeAccountId = (subAcc as { id: string | number }).id

        // 2) Instrumento por defecto (AUDCAD, luego lo conectamos al watchlist)
        const { data: inst, error: instErr } = await supabase
          .from('instruments')
          .select('id, symbol')
          .limit(1)
          .single()

        if (instErr) {
          console.error('No se pudo cargar instrumento:', instErr)
          this.tradingError = 'No se encontró instrumento por defecto (EURUSD).'
          return
        }

        const instrument = inst as { id: string | number; symbol: string }

        this.activeInstrumentId = instrument.id
        this.activeInstrumentSymbol = instrument.symbol

        console.log('Instrumento por defecto:', instrument)

      } catch (err) {
        console.error('Error en loadDefaultTradingContext:', err)
        this.tradingError = 'Error al cargar el contexto de trading.'
      }
    },


    /* ==================================================================
    SUPABASE - Método para cargar todas las subcuentas del usuario
    ================================================================== */
    async loadSubAccounts(): Promise<void> {
      if (!this.currentUser) return

      const { data, error } = await supabase
        .from('sub_accounts')
        .select('*')
        .eq('user_id', this.currentUser.id)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error cargando subaccounts:', error)
        return
      }

      this.subAccounts = data || []

      // Si aún no hay cuenta activa, usa la primera
      if (!this.activeAccountId && this.subAccounts.length > 0) {
        this.activeAccountId = this.subAccounts[0].id
      }

      // 👉 selección por defecto en el modal
      if (!this.selectedSubAccountId && this.subAccounts.length > 0) {
        this.selectedSubAccountId = this.activeAccountId || this.subAccounts[0].id
      }

      console.log('Subcuentas cargadas:', this.subAccounts)
    },


    /* ==================================================================
    SUPABASE - Método para cambiar de subcuenta y “abrir” su Traderoom
    ================================================================== */
    async handleSelectSubAccount(acc: any): Promise<void> {
      if (!acc || !acc.id) return;

      // 1️⃣ Marcar subcuenta seleccionada (estado inmediato)
      this.activeAccountId = acc.id;
      this.activeSubAccount = acc;

      // 2️⃣ Cerrar el modal PRIMERO (clave para evitar freeze)
      this.showAccountsModal = false;

      // 3️⃣ Esperar a que el modal desaparezca del DOM
      await this.$nextTick();

      try {
        // 4️⃣ Activar sesión lógica de trading
        this.currentUser = acc;

        this.tradingLoading = true;

        // 5️⃣ Cargar datos dependientes de la cuenta
        await Promise.all([
          this.loadOpenPositions(),
          this.loadPendingOrders?.(),
          this.loadHistory(),
          this.loadHistorySummary(),
        ]);

        // 6️⃣ Inicializar TradingView SOLO aquí
        this.initTradingViewWidget();

      } catch (err) {
        console.error('Error al cambiar de subcuenta:', err);
      } finally {
        this.tradingLoading = false;
      }
    },



    handleUiSelectSubAccount(acc: any): void {
      if (!acc || !acc.id) return;

      // 🔑 cuenta activa REAL (fuente de verdad)
      this.activeSubAccount = acc;

      // 🎨 selección visual
      this.selectedSubAccountId = acc.id;
    },


    /* ==================================================================
    SUPABASE - TRADINGFORM (OPEN POSITION - MARKET EXECUTION)
    ================================================================== */
    async placeMarketOrder(
      side: 'buy' | 'sell',
      customVolume: number | null = null,
      ignoreSlTp = false,
      fromTradingForm = false
    ): Promise<void> {
      console.log('currentUser:', this.currentUser);
      console.log('activeAccountId:', this.activeAccountId);
      console.log('activeInstrumentId:', this.activeInstrumentId);

      if (!this.currentUser) {
        this.showFormError('Necesitas iniciar sesión para operar.');
        return;
      }
      if (!this.activeAccountId || !this.activeInstrumentId) {
        console.log(
          'DEBUG -> activeAccountId:',
          this.activeAccountId,
          'activeInstrumentId:',
          this.activeInstrumentId
        );
        this.showFormError('No se encontró cuenta o instrumento activo.');
        return;
      }

      // 👉 volumen real a usar (si no viene custom, usa el del formulario grande)
      const volume = Number(
        customVolume !== null && customVolume !== undefined
          ? customVolume
          : this.volume
      );

      if (!volume || volume <= 0 || Number.isNaN(volume)) {
        this.showFormError('Volume inválido.');
        return;
      }

      // Helper para SL/TP
      const normalizeOptional = (value: unknown): number | null => {
        if (value === null || value === undefined || value === '') return null;
        const n = Number(value);
        return Number.isFinite(n) ? n : null;
      };

      // 👉 SL/TP: si viene de quick form y ignoreSlTp=true, los mandamos en null
      const takeProfit: number | null = ignoreSlTp
        ? null
        : normalizeOptional(this.takeProfit);
      const stopLoss: number | null = ignoreSlTp
        ? null
        : normalizeOptional(this.stopLoss);

      // 🔍 Validar SL/TP solo cuando NO queremos ignorarlos
      if (!ignoreSlTp) {
        const error = this.validateNewMarketSlTp(side);
        if (error) {
          this.showFormError(error); // luego lo mandamos al panel interno bonito
          return;
        }
      }

      this.tradingLoading = true;
      this.tradingError = null;

      try {
        const now = new Date().toISOString();
        const clientOrderId = `mkt-${Date.now()}-${Math.floor(
          Math.random() * 100000
        )}`;
        const ticket = this.generateTicketNumber();

        // 🔹 Instrumento activo (para sacar el symbol snapshot)
        const instrument = this.instruments.find(
          (i: any) => i.id === this.activeInstrumentId
        );
        const symbolSnapshot: string | null =
          (instrument && instrument.symbol) || this.activeInstrumentSymbol || null;

        // 🔹 Nuevo: precio real del símbolo activo (PRICE ENGINE)
        const tick = this.activeInstrumentSymbol
          ? this.pricesBySymbol[this.activeInstrumentSymbol]
          : null;

        const executionPrice = side === 'buy' ? tick?.ask : tick?.bid;

        if (!executionPrice || !Number.isFinite(executionPrice)) {
          this.showFormError('No hay precio disponible para este símbolo.');
          this.tradingLoading = false;
          return;
        }

        // ===================== INSERT EN ORDERS =====================
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: this.currentUser.id,
            account_id: this.activeAccountId,
            instrument_id: this.activeInstrumentId,
            symbol: symbolSnapshot,
            client_order_id: clientOrderId,
            ticket,
            side,
            execution: 'market',
            time_in_force: 'GTC',
            gtd_time: null,
            quantity_lots: volume,
            price: executionPrice,
            stop_price: null,
            take_profit: takeProfit, // 👈 ya normalizados
            stop_loss: stopLoss, // 👈 ya normalizados
            trailing_stop: null,
            reduce_only: false,
            hedge: true,
            status: 'filled',
            filled_lots: volume,
            avg_fill_price: executionPrice,
            margin_reserved: 0,
            created_at: now,
            accepted_at: now,
            filled_at: now,
            comment: this.orderComment || null,
            extra: null,
          })
          .select()
          .single();

        if (orderError) throw orderError;
        if (!order) {
          throw new Error('No se devolvió la orden creada.');
        }

        const createdOrder = order as { id: number | string; ticket: number | string };

        // ===================== INSERT EN POSITIONS =====================
        const { error: posError } = await supabase.from('positions').insert({
          user_id: this.currentUser.id,
          account_id: this.activeAccountId,
          instrument_id: this.activeInstrumentId,
          symbol: symbolSnapshot, // 👈 snapshot del símbolo
          entry_order_id: createdOrder.id,
          ticket: createdOrder.ticket,
          side,
          quantity_lots: volume,
          avg_entry_price: executionPrice,
          take_profit: takeProfit,
          stop_loss: stopLoss,
          status: 'open',
          opened_at: now,
          comment: this.orderComment || null,
          extra: null,
        });

        if (posError) throw posError;

        console.log('Orden de mercado + posición creada:', createdOrder.id);
        await this.loadOpenPositions();
        await this.loadHistory();

        // 🔔 ALERT – MARKET EXECUTION
        const sideLabel = side === 'buy' ? 'Buy by Market' : 'Sell by Market';
        const symbolForUi = symbolSnapshot || 'Symbol';

        this.showTradeAlert({
          kind: 'market',
          side,
          title: `${symbolForUi} ${side}`,
          text: `${sideLabel} ${volume} ${executionPrice} (#${createdOrder.ticket})`,
        });

        // 🧱 PANEL RESULTADO dentro del trading-form
        if (fromTradingForm && this.showTradingForm) {
          this.showOrderResultPanelWith({
            ticket: createdOrder.ticket,
            side,
            sideLabel,
            volume,
            symbol: symbolForUi,
            price: executionPrice,
            status: 'Terminado',
          });
        }
      } catch (err: any) {
        console.error('Error al enviar orden de mercado:', err);
        if (err && typeof err === 'object') {
          console.error('Detalle Supabase:', {
            message: (err as any).message,
            details: (err as any).details,
            hint: (err as any).hint,
            code: (err as any).code,
          });
        }

        const msg =
          err instanceof Error ? err.message : 'Error al enviar orden de mercado';
        this.tradingError = msg;
        this.showFormError(msg);
      } finally {
        this.tradingLoading = false;
      }
    },


    /* ==================================================================
    SUPABASE - TRADINGFORM (CLOSE OPEN POSITION)
    ================================================================== */
    async closePosition(
      pos: any | null
    ): Promise<void> {
      // 1. Validaciones básicas
      if (!this.currentUser || !this.activeAccountId) {
        this.showFormError('Necesitas iniciar sesión para operar.');
        return;
      }

      if (!pos || !pos.id) {
        console.warn('closePosition llamado sin pos.id');
        return;
      }

      const now = new Date().toISOString();
      console.log('CERRAR POSICIÓN ->', pos.id);

      try {
        this.tradingLoading = true;
        this.tradingError = null;

        // ⚠️ Profit abierto justo antes de cerrar (lo vamos a realizar)
        const openProfit: number = this.getOpenPositionProfit(pos) ?? 0;

        // ⚠️ Precio de cierre (usa tu helper; si no hay, toma avg_entry_price)
        const closePrice: number =
          this.getMarketPriceForPosition(pos) ?? pos.avg_entry_price ?? 0;

        const { data: updated, error } = await supabase
          .from('positions')
          .update({
            status: 'closed',
            closed_at: now,        // si no tienes la columna, bórrala
            close_price: closePrice, // si no la tienes, bórrala
            pnl_closed: openProfit,  // idem, si no existe en BD, quita este campo
          })
          .eq('id', pos.id)
          .eq('user_id', this.currentUser.id)
          .select()
          .single();

        if (error) throw error;
        if (!updated) {
          throw new Error('No se devolvió la posición actualizada.');
        }

        // Tip mínimo para que TS no moleste
        const closedPos = updated as {
          side: 'buy' | 'sell';
          quantity_lots: number;
          avg_entry_price: number;
          ticket: string | number;
          symbol?: string | null;
          pnl_closed?: number | null;
        };

        console.log('Posición cerrada OK:', closedPos);

        // 2️⃣ Actualizar balance de la sub_account con el PnL cerrado
        await this.applyClosedPnlToActiveAccount(openProfit);

        // 3️⃣ refrescamos la tabla
        await this.loadOpenPositions(); // OPEN POSITIONS
        await this.loadHistory();       // HISTORY

        // 🔔 ALERTA DE CIERRE → usar symbol de la propia posición
        const symbol = closedPos.symbol || this.activeInstrumentSymbol || 'Symbol';
        const sideLabel = closedPos.side === 'buy' ? 'buy' : 'sell';

        this.showTradeAlert({
          kind: 'close',
          side: closedPos.side,          // para color azul/rojo
          status: 'Terminado',
          title: `${symbol} ${sideLabel}`,
          text: `Close ${sideLabel} ${closedPos.quantity_lots} ${closedPos.avg_entry_price} (#${closedPos.ticket})`,
        });

        // 🧱 PANEL RESULTADO dentro del trading-form
        if (this.showTradingForm) {
          this.showOrderResultPanelWith({
            ticket: closedPos.ticket,
            side: closedPos.side,
            sideLabel,
            volume: closedPos.quantity_lots,
            symbol,                         // 👈 mismo símbolo que la posición
            price: closedPos.avg_entry_price,
            status: 'Terminado',
          });
        }

      } catch (err) {
        console.error('Error al cerrar posición:', err);
        const msg =
          err instanceof Error
            ? err.message
            : 'Error al cerrar posición.';
        this.tradingError = msg;
        this.showFormError(msg);
      } finally {
        this.tradingLoading = false;
      }
    },


    /* ==================================================================
    Suma el PnL cerrado al balance de la sub_account activa
    ================================================================== */
    async applyClosedPnlToActiveAccount(pnl: number): Promise<void> {
      if (!this.activeAccountId) return;

      // 👇 Evitamos que TS se queje del tipo de this
      const vm = this as any;

      // Busca la sub_account activa en tu array local
      const acc = vm.subAccounts?.find(
        (a: any) => a.id === vm.activeAccountId
      );

      const currentBalance: number = acc?.balance ?? 0;
      const newBalance = currentBalance + pnl;

      const { data, error } = await supabase
        .from('sub_accounts')
        .update({ balance: newBalance })
        .eq('id', vm.activeAccountId)
        .select()
        .single();

      if (error) {
        console.error('Error actualizando balance de sub_account:', error);
        return;
      }

      // Sincroniza en memoria para que el UI se actualice
      if (acc && data) {
        (acc as any).balance = (data as any).balance;
      }
    },


    /* ==========================================================
    VALIDACIÓN: SL/TP al abrir una MARKET ORDER nueva
    ========================================================== */
    validateNewMarketSlTp(side: 'buy' | 'sell'): string | null {
      const isBuy = side === 'buy';

      // helper para SL/TP opcionales
      const normalizeOptional = (value: unknown): number | null => {
        if (value === null || value === undefined || value === '') return null;
        const num = Number(value);
        if (!Number.isFinite(num) || num <= 0) return null;  // 0 o negativo = “no seteado”
        return num;
      };

      const sl = normalizeOptional(this.stopLoss);
      const tp = normalizeOptional(this.takeProfit);

      // usamos el mismo helper dummy que ya tienes
      const currentPrice: number = this.getCurrentPriceForValidation(side);
      const minDistance = 0.00010; // luego lo afinamos por símbolo

      console.log('[VALIDAR MARKET SL/TP]', {
        side,
        currentPrice,
        sl,
        tp,
      });

      // ---------- Reglas SL ----------
      if (sl !== null) {
        if (isBuy && sl >= currentPrice - minDistance) {
          return 'En una COMPRA, el Stop Loss debe estar por DEBAJO del precio actual.';
        }
        if (!isBuy && sl <= currentPrice + minDistance) {
          return 'En una VENTA, el Stop Loss debe estar por ENCIMA del precio actual.';
        }
      }

      // ---------- Reglas TP ----------
      if (tp !== null) {
        if (isBuy && tp <= currentPrice + minDistance) {
          return 'En una COMPRA, el Take Profit debe estar por ENCIMA del precio actual.';
        }
        if (!isBuy && tp >= currentPrice - minDistance) {
          return 'En una VENTA, el Take Profit debe estar por DEBAJO del precio actual.';
        }
      }

      // ✅ permitir quitar SL/TP (ambos null) sin error
      return null;
    },


    /* ==========================================================
    VALIDACIÓN: MODIFICAR POSICIÓN ABIERTA (SL / TP)
    ========================================================== */
    validateModifyOpenPosition(position: any | null): string | null {
      if (!position) return 'No hay posición seleccionada.';

      const side = position.side;   // 'buy' | 'sell'
      const isBuy = side === 'buy';

      // --- helpers para normalizar SL/TP opcionales ---
      const normalizeOptional = (
        value: number | string | null | undefined
      ): number | null => {
        if (value === null || value === undefined || value === '') return null;
        const num = Number(value);
        if (!isFinite(num) || num <= 0) return null;  // 0 ó negativo = “no seteado”
        return num;
      };

      const sl = normalizeOptional(this.stopLoss as number | string | null | undefined);
      const tp = normalizeOptional(this.takeProfit as number | string | null | undefined);

      // ===== nuevo: SI NO HAY CAMBIOS, BLOQUEAMOS =====
      const slOriginal = normalizeOptional(
        position.stop_loss as number | string | null | undefined
      );
      const tpOriginal = normalizeOptional(
        position.take_profit as number | string | null | undefined
      );
      const commentNow = (this.orderComment || '').trim();
      const commentOriginal = (position.comment || '').trim();

      if (sl === slOriginal && tp === tpOriginal && commentNow === commentOriginal) {
        // sin cambios -> consideramos error para que el botón quede deshabilitado
        return 'No hay cambios para modificar.';
      }

      // ⬅️ ahora sí usamos la posición para obtener el precio
      const currentPrice = this.getCurrentPriceForValidation(side, position);
      if (!currentPrice || !isFinite(currentPrice)) {
        return 'No se pudo obtener el precio actual para validar SL/TP.';
      }

      const minDistance = 0.00010; // luego lo afinamos por símbolo

      console.log('[VALIDAR OPEN]', {
        side,
        currentPrice,
        sl,
        tp,
      });

      // ---------- Reglas SL ----------
      if (sl !== null) {
        if (isBuy && sl >= currentPrice - minDistance) {
          return 'En una posición de COMPRA, el Stop Loss debe estar por DEBAJO del precio actual.';
        }
        if (!isBuy && sl <= currentPrice + minDistance) {
          return 'En una posición de VENTA, el Stop Loss debe estar por ENCIMA del precio actual.';
        }
      }

      // ---------- Reglas TP ----------
      if (tp !== null) {
        if (isBuy && tp <= currentPrice + minDistance) {
          return 'En una posición de COMPRA, el Take Profit debe estar por ENCIMA del precio actual.';
        }
        if (!isBuy && tp >= currentPrice - minDistance) {
          return 'En una posición de VENTA, el Take Profit debe estar por DEBAJO del precio actual.';
        }
      }

      // ✅ Permitimos quitar SL/TP (ambos null) sin error
      return null;
    },


    /* ===========================================================
    ABRIR TRADING FORM PARA EDITAR UNA POSICIÓN (DOBLE CLICK)
    =========================================================== */
    openTradingFormForPosition(pos: {
      quantity_lots?: number | string | null
      avg_entry_price?: number | null
      stop_loss?: number | null
      take_profit?: number | null
      comment?: string | null
    }): void {
      // 🔹 Cerrar el panel de resultado si está abierto
      if (this.showOrderResultPanel) {
        this.closeOrderResultPanel();
      }
      // Mostrar el trading-form
      this.showTradingForm = true;

      // 🧹 estamos editando posición, no pending
      this.editingPendingOrder = null;
      this.showDeletePendingButton = false;

      // Guardamos la posición que se está editando
      this.editingPosition = pos;

      // Tipo de formulario
      this.orderType = 'market';

      // Rellenar inputs con valores de la posición
      this.volume = Number(pos.quantity_lots) || 0.01;
      this.price = pos.avg_entry_price ?? null;
      this.stopLoss = pos.stop_loss ?? null;
      this.takeProfit = pos.take_profit ?? null;
      this.orderComment = pos.comment || '';

      // Mostrar / ocultar secciones EXACTO como pediste:
      this.showVolume = false;          // ❌
      this.showVolumePrice = true;      // ✅
      this.showPriceStopLimit = false;  // ❌
      this.showSLTP = true;             // ✅
      this.showExpiration = false;      // ❌
      this.showComment = true;          // ✅
      this.showSellBuyMarket = false;   // ❌

      // Mostrar botones especiales
      this.showModifyButton = true;
      this.showClosePositionButton = true;

      // Ocultar botones de place order normales
      this.showPlaceOrderBuy = false;
      this.showPlaceOrderSell = false;
    },


    /* ==================================================================
    MARKETFORM (OPEN POSITION - MARKET EXECUTION)
    ================================================================== */
    incrementQuickVolume(): void {
      const step = 0.01;
      const v = (this.quickVolume || 0) + step;
      this.quickVolume = +v.toFixed(2);
    },


    decrementQuickVolume(): void {
      const step = 0.01;
      const min = 0.01;
      const v = (this.quickVolume || 0) - step;
      this.quickVolume = +Math.max(min, v).toFixed(2);
    },


    /* ==================================================================
    SUPABASE - TRADINGFORM (PENDING ORDER)
    ================================================================== */
    async placePendingOrder(side: 'buy' | 'sell'): Promise<void> {
      if (!this.currentUser) {
        this.showFormError('Necesitas iniciar sesión para operar.');
        return;
      }
      if (!this.activeAccountId || !this.activeInstrumentId) {
        this.showFormError('No se encontró cuenta o instrumento activo.');
        return;
      }
      if (!this.volume || this.volume <= 0) {
        this.showFormError('Volume inválido.');
        return;
      }

      // 🔍 VALIDACIÓN DE LÓGICA DE PENDING (precio vs mercado, SL/TP, etc.)
      const validationError = this.validatePendingOrder(side);
      if (validationError) {
        this.showFormError(validationError); // luego lo conectamos al panel interno
        return;
      }

      // ================= MAPEO orderType → execution / price =================
      let execution: string | null = null;
      let price: number | null = null;
      let stopPrice: number | null = null;

      switch (this.orderType) {
        case 'buy_limit':
        case 'sell_limit':
          execution = 'limit';
          price = this.price;          // precio al que se quiere ejecutar
          break;

        case 'buy_stop':
        case 'sell_stop':
          execution = 'stop';
          stopPrice = this.price;      // nivel de disparo
          break;

        case 'buy_stop_limit':
        case 'sell_stop_limit':
          execution = 'stop_limit';
          price = this.price;          // precio límite
          stopPrice = this.stopLimitPrice;   // precio stop
          break;

        default:
          // Cualquier cosa que no sea pending, avisamos
          this.showFormError('El tipo de orden actual es market, usa los botones Buy/Sell by Market.');
          return;
      }

      if (!price && !stopPrice) {
        this.showFormError('Debes especificar el precio de la orden.');
        return;
      }

      this.tradingLoading = true;
      this.tradingError = null;

      try {
        // 🔹 Instrumento activo (para snapshot del símbolo)
        const instrument = this.instruments.find(
          (i: any) => i.id === this.activeInstrumentId
        );
        const symbolSnapshot: string | null =
          (instrument && instrument.symbol) || this.activeInstrumentSymbol || null;

        const now = new Date().toISOString();
        const clientOrderId = `ord-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
        const ticket = Math.floor(10000000 + Math.random() * 90000000);

        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: this.currentUser.id,
            account_id: this.activeAccountId,
            instrument_id: this.activeInstrumentId,
            symbol: symbolSnapshot,          // 👈 guardamos snapshot también en orders
            client_order_id: clientOrderId,
            ticket,
            side,                            // 'buy' | 'sell'
            execution,                       // 'limit' | 'stop' | 'stop_limit'
            time_in_force: 'GTC',            // luego lo conectamos a expirationType
            gtd_time: null,
            quantity_lots: this.volume,
            price,
            stop_price: stopPrice,
            take_profit: this.takeProfit || null,
            stop_loss: this.stopLoss || null,
            trailing_stop: null,
            reduce_only: false,
            hedge: true,
            status: 'pending',
            filled_lots: 0,
            avg_fill_price: null,
            margin_reserved: 0,
            reason: null,
            placed_at: now,
            comment: this.orderComment || null,
            extra: null,
          })
          .select()
          .single();

        if (orderError) throw orderError;

        console.log('Orden pendiente creada:', order);

        // Recargar tabla de órdenes pendientes
        await this.loadPendingOrders();
        await this.loadHistory();

        // 🔔 ALERT – PENDING ORDER
        const symbolForUi = symbolSnapshot || this.activeInstrumentSymbol || 'Symbol';
        const typeLabel = this.orderType.replace(/_/g, ' ');  // "buy_limit" -> "buy limit"
        const pendingSide: 'buy' | 'sell' =
          this.orderType.startsWith('buy') ? 'buy' : 'sell';

        this.showTradeAlert({
          kind: 'pending',
          side: pendingSide,
          sideLabel: typeLabel,
          title: `${symbolForUi} ${typeLabel}`,
          text: `${typeLabel} ${this.volume} ${price || stopPrice} (#${order.ticket})`,
        });

        // 👇 Panel dentro del trading-form
        if (this.showTradingForm) {
          this.showOrderResultPanelWith({
            ticket: order.ticket,
            side: pendingSide,
            sideLabel: typeLabel,          // buy limit, sell stop, buy stop limit...
            volume: this.volume,
            symbol: symbolForUi,
            price: price || stopPrice,
            status: 'Terminado',
          });
        }

      } catch (err: any) {
        console.error('Error al enviar orden pendiente:', err);
        const message: string = err?.message ?? 'Error al enviar orden pendiente';
        this.tradingError = message;
        this.showFormError(message);
      } finally {
        this.tradingLoading = false;
      }
    },


    /* ==================================================================
    SUPABASE - TRADINGFORM (PENDING ORDER - CANCEL ORDER)
    ================================================================== */
    async cancelPendingOrder(ord: any): Promise<void> {
      if (!this.currentUser || !this.activeAccountId) {
        this.showFormError('Necesitas iniciar sesión para operar.');
        return;
      }

      if (!ord || !ord.id) {
        console.warn('cancelPendingOrder llamado sin ord.id');
        return;
      }

      const now = new Date().toISOString();
      console.log('CANCELAR ORDEN PENDIENTE ->', ord.id);

      try {
        this.tradingLoading = true;
        this.tradingError = null;

        const { data, error } = await supabase
          .from('orders')
          .update({
            status: 'cancelled',
            cancelled_at: now,   // si no existe la columna, bórrala
          })
          .eq('id', ord.id)
          .eq('user_id', this.currentUser.id)
          .select()
          .single();

        if (error) throw error;

        console.log('Orden cancelada OK:', data);

        // Recargamos tabla
        await this.loadPendingOrders(); // RECARGAMOS PENDING POSITIONS
        await this.loadHistory();       // RECARGAMOS HISTORY

        // 🔔 ALERTA DE CANCELACIÓN
        const symbol = this.activeInstrumentSymbol || 'Symbol';

        // Usa TU helper para obtener el tipo de orden
        const typeLabel = this.formatOrderType(ord) || 'pending order';
        // ej: "buy limit", "sell stop", "buy stop limit"

        // buy / sell solo para el color
        const side: 'buy' | 'sell' =
          (ord.side || '').toLowerCase() === 'buy' ? 'buy' : 'sell';

        this.showTradeAlert({
          kind: 'cancel',
          side,                     // para color azul/rojo
          sideLabel: typeLabel,     // 👈 buy limit / sell limit / buy stop / sell stop...
          status: 'Terminado',
          title: `${symbol} ${typeLabel}`,
          text: `Cancel ${typeLabel} ${ord.quantity_lots} ${ord.price || ord.stop_price || '-'} (#${ord.ticket})`
        });

        // 🧱 PANEL RESULTADO dentro del trading-form
        if (this.showTradingForm) {
          this.orderResultPanel = {
            ticket: ord.ticket,
            side,
            sideLabel: typeLabel,
            volume: ord.quantity_lots,
            symbol,
            price: ord.price || ord.stop_price || '-',
            status: 'Terminado'
          };
          this.showOrderResultPanel = true;
        }

      } catch (err: any) {
        console.error('Error al cancelar orden pendiente:', err);
        const message: string = err?.message ?? 'Error al cancelar orden pendiente.';
        this.tradingError = message;
        this.showFormError(message);
      } finally {
        this.tradingLoading = false;
      }
    },


    /* ===========================================================
    ABRIR TRADING FORM PARA EDITAR UNA PENDING ORDER (DOBLE CLICK)
    =========================================================== */
    openTradingFormForPending(ord: any): void {
      // 🔹 Cerrar el panel de resultado si está abierto
      if (this.showOrderResultPanel) {
        this.closeOrderResultPanel();
      }
      this.showTradingForm = true;

      this.editingPosition = null;
      this.editingPendingOrder = ord;

      // side + execution desde la fila
      const side: 'buy' | 'sell' = String(ord.side || 'buy').toLowerCase() as 'buy' | 'sell';
      const execution: 'limit' | 'stop' | 'stop_limit' | 'market' =
        String(ord.execution || 'limit').toLowerCase() as any;

      // 🧠 reconstruimos orderType: buy_limit, sell_stop, buy_stop_limit, etc.
      let type: string = 'market';
      if (execution === 'market') type = side;
      else if (execution === 'limit') type = `${side}_limit`;
      else if (execution === 'stop') type = `${side}_stop`;
      else if (execution === 'stop_limit') type = `${side}_stop_limit`;

      this.orderType = type as any;  

      // 🧩 mapear correctamente los precios según el tipo
      let price: number | null = null;
      let stopLimitPrice: number | null = null;

      if (execution === 'limit') {
        price = ord.price;
      } else if (execution === 'stop') {
        price = ord.stop_price;
      } else if (execution === 'stop_limit') {
        price = ord.price;
        stopLimitPrice = ord.stop_price;
      }

      this.volume =
        Number(ord.quantity_lots ?? ord.volume_lots ?? ord.volume ?? 0.01) || 0.01;

      this.price = price != null ? Number(price) : null;
      this.stopLimitPrice =
        stopLimitPrice != null ? Number(stopLimitPrice) : null;
      this.stopLoss = ord.stop_loss ?? null;
      this.takeProfit = ord.take_profit ?? null;
      this.orderComment = ord.comment || '';
      this.expirationType = ord.expiration_type || 'gtc';

      const isStopLimit = execution === 'stop_limit';

      // Layout según sea LIMIT/STOP o STOP_LIMIT
      if (!isStopLimit) {
        this.showVolume = false;          // ❌
        this.showVolumePrice = true;      // ✅
        this.showPriceStopLimit = false;  // ❌
      } else {
        this.showVolume = true;           // ✅
        this.showVolumePrice = false;     // ❌
        this.showPriceStopLimit = true;   // ✅
      }

      this.showSLTP = true;
      this.showExpiration = true;
      this.showComment = true;

      this.showSellBuyMarket = false;
      this.showPlaceOrderBuy = false;
      this.showPlaceOrderSell = false;

      this.showModifyButton = true;
      this.showDeletePendingButton = true;
      this.showClosePositionButton = false;

      // 👇 Snapshot del formulario al entrar en modo edición
      this.originalPendingForm = {
        volume: this.volume,
        price: this.price,
        stopLimitPrice: this.stopLimitPrice,
        stopLoss: this.stopLoss,
        takeProfit: this.takeProfit,
        orderComment: this.orderComment,
        expirationType: this.expirationType,
      };
    },


    /* ==================================================================
    FUNCION CENTRAL DE VALIDACION - OPEN POSITIONS
    ================================================================== */
    getCurrentPriceForValidation(
      side: 'buy' | 'sell',
      position: { avg_entry_price?: number | string | null } | null = null
    ): number {
      // 1) Si viene una posición, usamos su precio (por ahora avg_entry_price)
      if (position && position.avg_entry_price != null) {
        const p = Number(position.avg_entry_price);
        if (Number.isFinite(p) && p > 0) return p;
      }

      // 2) Intentar usar el precio del instrumento activo desde el price engine
      if (this.activeInstrumentSymbol) {
        const tick = this.pricesBySymbol[this.activeInstrumentSymbol];
        if (tick) {
          const px = side === 'buy' ? tick.ask : tick.bid;
          if (Number.isFinite(px) && px > 0) {
            return px;
          }
        }
      }

      // 3) Fallback (para no romper nada mientras tanto)
      return 1;
    },


    // Precio de mercado actual para UNA posición (el que se usa para P/L)
    getMarketPriceForPosition(pos: any): string | null {
      if (!pos) return null;

      // 1) localizar instrumento por instrument_id
      const inst = this.instruments.find((i: any) => i.id === pos.instrument_id);
      if (!inst || !inst.symbol) return null;

      const symbol = inst.symbol;
      const tick = this.pricesBySymbol[symbol];
      if (!tick || tick.bid == null || tick.ask == null) return null;

      const bid = Number(tick.bid);
      const ask = Number(tick.ask);
      if (!Number.isFinite(bid) || !Number.isFinite(ask)) return null;

      // 2) BUY -> usa ASK,  SELL -> usa BID
      const side = (pos.side || pos.type || '').toLowerCase();
      const rawPrice = side === 'buy' ? ask : bid;
      if (!Number.isFinite(rawPrice) || rawPrice <= 0) return null;

      // 3) digits desde Supabase (igual que en el watchlist)
      const digits =
        this.digitsBySymbol && this.digitsBySymbol[symbol] != null
          ? this.digitsBySymbol[symbol]
          : 5;

      // devolvemos string ya formateado con todos los decimales
      return rawPrice.toFixed(digits);
    },


    /* ==================================================================
    OBTENER PRECCIO MARKET - OPEN POSITIONS
    ================================================================== */
    getPositionMarketPrice(pos: any): number | null {
      const tick = this.pricesBySymbol[pos.symbol];
      if (!tick || tick.bid == null || tick.ask == null) return null;

      const bid = Number(tick.bid);
      const ask = Number(tick.ask);

      // Ajusta el campo según como lo guardes: pos.side, pos.type, pos.order_side, etc.
      const side = (pos.side || pos.type || '').toLowerCase();

      if (side === 'buy') {
        return ask;
      } else if (side === 'sell') {
        return bid;
      }

      // Fallback (por si algo viene raro): mid price
      return (bid + ask) / 2;
    },


    /* ==================================================================
    OBTENER PRECCIO MARKET - PENGING POSITIONS
    ================================================================== */
    getPendingMarketPrice(ord: any): number | null {
      if (!ord || !ord.symbol) return null;

      const tick = this.pricesBySymbol[ord.symbol];
      if (!tick || tick.bid == null || tick.ask == null) return null;

      const bid = Number(tick.bid);
      const ask = Number(tick.ask);
      if (!Number.isFinite(bid) || !Number.isFinite(ask)) return null;

      // 🔹 MT5-style:
      // buy pending → mostrar ASK
      // sell pending → mostrar BID
      const side = (ord.side || '').toLowerCase();

      if (side === 'buy') return ask;
      if (side === 'sell') return bid;

      // fallback
      return (bid + ask) / 2;
    },


    formatPendingMarketPrice(ord: any): string {
      const px = this.getPendingMarketPrice(ord); // number | null
      if (px == null) return '-';
      return this.formatPrice(px, ord.symbol);
    },


    /* ==================================================================
    PENDING POSITIONS - Helper para texto de status
    ================================================================== */
    formatPendingStatus(ord: any): string {
      const status = (ord?.status || '').toLowerCase();
      switch (status) {
        case 'pending':
          return 'Placed';
        case 'triggered':
          return 'Triggered';
        case 'cancelled':
          return 'Cancelled';
        case 'expired':
          return 'Expired';
        case 'rejected':
          return 'Rejected';
        default:
          return status || '-';
      }
    },


    // =========================================================
    // Profit flotante de una posición abierta (DEMO, en USD)
    // =========================================================
    getOpenPositionProfit(pos: any): number | null {
      if (!pos || !pos.symbol) return null;

      // Tick actual
      const tick = this.pricesBySymbol[pos.symbol];
      if (!tick || tick.bid == null || tick.ask == null) return null;

      const bid = Number(tick.bid);
      const ask = Number(tick.ask);
      if (!Number.isFinite(bid) || !Number.isFinite(ask)) return null;

      // Datos de la posición
      const side = String(pos.side || '').toLowerCase(); // 'buy' | 'sell'
      const entryPrice = Number(pos.avg_entry_price);
      if (!Number.isFinite(entryPrice)) return null;

      const lots = Number(pos.quantity_lots);
      if (!Number.isFinite(lots) || lots <= 0) return null;

      // Tamaño de contrato (CLAVE)
      // EURUSD -> 100000
      // XAUUSD -> 100
      const contractSize =
        this.contractSizeBySymbol[pos.symbol] != null
          ? Number(this.contractSizeBySymbol[pos.symbol])
          : 100000; // fallback FX

      // Precio al que cerrarías AHORA
      // BUY  -> cierras al BID
      // SELL -> cierras al ASK
      const closePrice =
        side === 'buy'
          ? bid
          : ask;

      if (!Number.isFinite(closePrice)) return null;

      // Diferencia de precio
      const diff =
        side === 'buy'
          ? closePrice - entryPrice
          : entryPrice - closePrice;

      // PnL final
      const pnl = diff * contractSize * lots;

      return pnl;
    },


    // ----------------------------------------------------
    // Precio de ejecución real para órdenes a mercado
    // ----------------------------------------------------
    getExecutionPrice(side: 'buy' | 'sell'): number {
      // Debe existir símbolo activo
      if (!this.activeInstrumentSymbol) {
        return NaN;
      }

      // Tick actual del símbolo activo (viene del priceEngine)
      const tick = this.pricesBySymbol[this.activeInstrumentSymbol];

      if (!tick) {
        console.warn('[PRICE] No hay tick para', this.activeInstrumentSymbol);
        return NaN;
      }

      // ✅ BUY -> ASK   |   SELL -> BID
      const raw =
        side === 'buy'
          ? tick.ask    // precio de compra del cliente
          : tick.bid;   // precio de venta del cliente

      const px = Number(raw);

      if (!Number.isFinite(px) || px <= 0) {
        console.warn('[PRICE] Precio inválido para', this.activeInstrumentSymbol, 'tick:', tick);
        return NaN;
      }

      return px;
    },


    // ----------------------------------------------------
    // VALIDACIÓN DE PENDING ORDERS
    // side = 'buy' | 'sell'
    // Devuelve null si todo OK, o string con el error si hay problema.
    // ----------------------------------------------------
    validatePendingOrder(side: 'buy' | 'sell'): string | null {
      const type = this.orderType as string;              // 'buy_limit', 'sell_stop_limit', etc.
      const isBuy = side === 'buy';

      // ------- Helpers para normalizar campos numéricos -------
      const normalizeOptional = (value: unknown): number | null => {
        if (value === null || value === undefined || value === '') return null;
        const num = Number(value);
        if (!isFinite(num) || num <= 0) return null;  // 0 o negativo = "no seteado"
        return num;
      };

      const normalizeRequired = (value: unknown): number | null => {
        const num = Number(value);
        if (!isFinite(num) || num <= 0) return null;
        return num;
      };

      // --------- Campos base ----------
      const price: number | null =
        this.price != null ? Number(this.price) : null;

      const stopLimitPrice: number | null =
        this.stopLimitPrice != null ? Number(this.stopLimitPrice) : null;

      const sl = normalizeOptional(this.stopLoss);
      const tp = normalizeOptional(this.takeProfit);

      const currentPrice = this.getCurrentPriceForValidation(side);

      // Distancia mínima (ajusta luego por símbolo)
      const minDistance = 0.00010; // 1 pip aprox en EURUSD

      // --------- Checks básicos ----------
      const isStop = (type === 'buy_stop' || type === 'sell_stop');
      const isStopLimit = (type === 'buy_stop_limit' || type === 'sell_stop_limit');

      // price obligatorio en LIMIT y STOP_LIMIT
      if (!isStop && !isStopLimit) {
        if (price === null) {
          return 'El precio de entrada es obligatorio.';
        }
        if (price <= 0) {
          return 'El precio de entrada debe ser mayor a 0.';
        }
      }

      if (!this.volume || isNaN(this.volume) || this.volume <= 0) {
        return 'El volumen debe ser mayor a 0.';
      }

      const step = 0.01;
      if (Math.round(this.volume / step) * step !== this.volume) {
        return `El volumen debe ser múltiplo de ${step}.`;
      }

      // --------- Reglas por tipo ----------

      // BUY LIMIT: por debajo del mercado
      if (type === 'buy_limit') {
        if (price === null) {
          return 'El precio de entrada es obligatorio.';
        }
        if (price !== null && price >= currentPrice - minDistance) {
          return 'En una orden Buy Limit, el precio debe estar por DEBAJO del precio actual.';
        }
      }

      // SELL LIMIT: por encima del mercado
      if (type === 'sell_limit') {
        if (price === null) {
          return 'El precio de entrada es obligatorio.';
        }
        if (price !== null && price <= currentPrice + minDistance) {
          return 'En una orden Sell Limit, el precio debe estar por ENCIMA del precio actual.';
        }
      }


      // BUY STOP: trigger por encima del mercado
      if (type === 'buy_stop') {
        const trigger = normalizeRequired(this.price);
        if (trigger === null) {
          return 'El precio de activación es obligatorio en una orden Buy Stop.';
        }
        if (trigger <= currentPrice + minDistance) {
          return 'En una orden Buy Stop, el precio debe estar por ENCIMA del precio actual.';
        }
      }

      // SELL STOP: trigger por debajo del mercado
      if (type === 'sell_stop') {
        const trigger = normalizeRequired(this.price);
        if (trigger === null) {
          return 'El precio de activación es obligatorio en una orden Sell Stop.';
        }
        if (trigger >= currentPrice - minDistance) {
          return 'En una orden Sell Stop, el precio debe estar por DEBAJO del precio actual.';
        }
      }

      // STOP LIMIT (dos precios)
      if (isStopLimit) {
        const trigger = normalizeRequired(this.price);
        const limitPrice = normalizeRequired(this.stopLimitPrice);

        if (trigger === null) {
          return 'El precio de activación es obligatorio en una orden Stop Limit.';
        }
        if (limitPrice === null) {
          return 'En una orden Stop Limit, el campo "Stop Limit Price" es obligatorio.';
        }

        if (type === 'buy_stop_limit') {
          if (trigger <= currentPrice + minDistance) {
            return 'En una orden Buy Stop Limit, el precio debe estar por ENCIMA del precio actual.';
          }
          if (limitPrice > trigger) {
            return 'En Buy Stop Limit, el Stop Limit Price debe ser menor o igual al precio de activación.';
          }
        }

        if (type === 'sell_stop_limit') {
          if (trigger >= currentPrice - minDistance) {
            return 'En una orden Sell Stop Limit, el precio debe estar por DEBAJO del precio actual.';
          }
          if (limitPrice < trigger) {
            return 'En Sell Stop Limit, el Stop Limit Price debe ser mayor o igual al precio de activación.';
          }
        }
      }

      // --------- Validación SL / TP (opcionales) ----------
      // entryPrice: el precio de entrada de la orden
      let entryPrice: number | null = null;
      if (type === 'buy_stop' || type === 'sell_stop') {
        entryPrice = normalizeRequired(this.price);
      } else if (isStopLimit) {
        entryPrice = normalizeRequired(this.stopLimitPrice); // depende cómo quieras, aquí uso el limit
      } else {
        entryPrice = normalizeRequired(this.price);
      }

      if (entryPrice !== null) {
        if (sl !== null) {
          if (isBuy && sl >= entryPrice - minDistance) {
            return 'En una orden de compra, el Stop Loss debe estar por DEBAJO del precio de entrada.';
          }
          if (!isBuy && sl <= entryPrice + minDistance) {
            return 'En una orden de venta, el Stop Loss debe estar por ENCIMA del precio de entrada.';
          }
        }

        if (tp !== null) {
          if (isBuy && tp <= entryPrice + minDistance) {
            return 'En una orden de compra, el Take Profit debe estar por ENCIMA del precio de entrada.';
          }
          if (!isBuy && tp >= entryPrice - minDistance) {
            return 'En una orden de venta, el Take Profit debe estar por DEBAJO del precio de entrada.';
          }
        }
      }

      return null; // todo OK
    },


    /* ==================================================================
    TRADINGFORM (EDIT OPEN POSITION)
    ================================================================== */
    async modifyPosition(): Promise<void> {
      if (!this.currentUser) {
        this.showFormError('Necesitas iniciar sesión para modificar la posición.');
        return;
      }
      if (!this.editingPosition) {
        this.showFormError('No hay posición seleccionada para modificar.');
        return;
      }

      // 🔹 Validación de SL/TP
      const error = this.validateModifyOpenPosition(this.editingPosition);
      console.log('[ERROR VALIDACIÓN OPEN]', error);
      if (error) {
        this.showFormError(error);      // luego lo mandamos al panel bonito
        return;                         // 👈 MUY IMPORTANTE
      }

      try {
        this.tradingLoading = true;
        this.tradingError = null;

        const pos = this.editingPosition;

        // Normalizar SL/TP a null o número
        const normalizeOptional = (value: unknown): number | null => {
          if (value === null || value === undefined || value === '') return null;
          const num = Number(value);
          return Number.isFinite(num) ? num : null;
        };

        const newSL = normalizeOptional(this.stopLoss);
        const newTP = normalizeOptional(this.takeProfit);

        // 🔄 UPDATE en Supabase
        const { data: updated, error: updateError } = await supabase
          .from('positions')
          .update({
            stop_loss: newSL,
            take_profit: newTP,
            comment: this.orderComment || null,
          })
          .eq('id', pos.id)
          .eq('user_id', this.currentUser.id)
          .select()
          .single();

        if (updateError) throw updateError;
        if (!updated) throw new Error('No se devolvió la posición actualizada.');

        console.log('Posición modificada OK:', updated);

        // refrescamos tablas
        await this.loadOpenPositions();
        await this.loadHistory();

        // actualizamos la posición en edición
        this.editingPosition = updated;

        const symbol = this.activeInstrumentSymbol || 'Symbol';
        const sideLabel: 'buy' | 'sell' =
          updated.side === 'buy' ? 'buy' : 'sell';

        // 🔔 ALERTA de modificación
        this.showTradeAlert({
          kind: 'modify',
          side: updated.side,
          sideLabel,
          title: `${symbol} ${sideLabel}`,
          text: `Modify SL/TP ${updated.quantity_lots} @ ${updated.avg_entry_price} (#${updated.ticket})`,
          status: 'Terminado',
        });

        // 🧱 PANEL RESULTADO dentro del trading-form
        if (this.showTradingForm) {
          this.showOrderResultPanelWith({
            ticket: updated.ticket,
            side: updated.side,
            sideLabel,
            volume: updated.quantity_lots,
            symbol,
            price: updated.avg_entry_price,
            status: 'Terminado',
          });
        }

      } catch (err: any) {
        console.error('Error al modificar posición:', err);
        this.tradingError = err.message ?? 'Error al modificar posición';

        // 🔥 FIX TYPESCRIPT — forzar string
        this.showFormError(String(this.tradingError));
      } finally {
        this.tradingLoading = false;
      }
    },


    /* ==================================================================
    TRADINGFORM - METODO DESPACHADOR
    ================================================================== */
    onClickModify(): void {
      // Si estoy editando una posición abierta -> usa modifyPosition
      if (this.editingPosition) {
        this.modifyPosition();
        return;
      }

      // Si estoy editando una pending -> usa modifyPendingOrder
      if (this.editingPendingOrder) {
        this.modifyPendingOrder();
        return;
      }

      // Fallback por si acaso
      this.showFormError('No hay nada seleccionado para modificar.');
    },


    /* ==================================================================
    TRADINGFORM - stub para modifyPendingOrder
    ================================================================== */
    async modifyPendingOrder(): Promise<void> {
      if (!this.currentUser) {
        this.showFormError('Necesitas iniciar sesión para modificar la orden.');
        return;
      }
      if (!this.editingPendingOrder) {
        this.showFormError('No hay orden pendiente seleccionada para modificar.');
        return;
      }

      const ord: any = this.editingPendingOrder;
      const side = ((ord.side || 'buy') as string).toLowerCase() as 'buy' | 'sell';

      // 1) Validar lógica de la pending con los valores del form
      const validationError = this.validatePendingOrder(side);
      if (validationError) {
        this.showFormError(validationError);
        return;
      }

      try {
        this.tradingLoading = true;
        this.tradingError = null;

        // Helpers para normalizar números
        const toNumOrNull = (val: unknown): number | null => {
          if (val === null || val === undefined || val === '') return null;
          const n = Number(val);
          return isFinite(n) ? n : null;
        };

        const newVolume = toNumOrNull(this.volume);
        const newSL     = toNumOrNull(this.stopLoss);
        const newTP     = toNumOrNull(this.takeProfit);

        // Precio / stop_price según tipo de ejecución
        const exec = String(ord.execution || '').toLowerCase(); // 'limit' | 'stop' | 'stop_limit'
        let newPrice: number | null = null;
        let newStopPrice: number | null = null;

        if (exec === 'limit') {
          newPrice = toNumOrNull(this.price);
        } else if (exec === 'stop') {
          newStopPrice = toNumOrNull(this.price);
        } else if (exec === 'stop_limit') {
          newPrice     = toNumOrNull(this.price);
          newStopPrice = toNumOrNull(this.stopLimitPrice);
        }

        // 2) UPDATE en Supabase
        const { data: updated, error } = await supabase
          .from('orders')
          .update({
            quantity_lots: newVolume,
            price: newPrice,
            stop_price: newStopPrice,
            take_profit: newTP,
            stop_loss: newSL,
            time_in_force: (this.expirationType || ord.time_in_force || 'gtc').toUpperCase(),
            comment: this.orderComment || null,
          })
          .eq('id', ord.id)
          .eq('user_id', this.currentUser.id)
          .select()
          .single();

        if (error) throw error;

        console.log('Pending order modificada OK:', updated);

        // 3) Refrescar tablas
        await this.loadPendingOrders();
        await this.loadHistory();

        // Actualizar la referencia local
        this.editingPendingOrder = updated;

        const symbol: string = this.activeInstrumentSymbol || 'Symbol';
        const typeLabel: string = this.formatOrderType(updated) || 'pending order';

        // 🔔 ALERTA de modificación
        this.showTradeAlert({
          kind: 'modify',
          side: updated.side,
          sideLabel: typeLabel,
          title: `${symbol} ${typeLabel}`,
          text: `Modify ${typeLabel} ${updated.quantity_lots} ${updated.price || updated.stop_price || '-'} (#${updated.ticket})`,
          status: 'Terminado',
        });

        // 🧱 PANEL RESULTADO dentro del trading-form
        if (this.showTradingForm) {
          this.showOrderResultPanelWith({
            ticket: updated.ticket,
            side: updated.side,
            sideLabel: typeLabel,
            volume: updated.quantity_lots,
            symbol,
            price: updated.price || updated.stop_price || '-',
            status: 'Terminado',
          });
        }

      } catch (err: any) {
        console.error('Error al modificar pending order:', err);
        this.tradingError = err.message ?? 'Error al modificar la orden pendiente.';

        // 🔥 FIX TS: asegurar string
        this.showFormError(String(this.tradingError));
      } finally {
        this.tradingLoading = false;
      }
    },


    async closeEditingPosition(): Promise<void> {
      if (!this.editingPosition) {
        this.showFormError('No hay posición seleccionada para cerrar.');
        return;
      }

      // usamos tu función ya implementada
      await this.closePosition(this.editingPosition);

      // salimos del modo edición y volvemos a Market Execution limpio
      this.resetTradingFormToMarketExecution();
    },


    async deletePendingOrder(): Promise<void> {
      if (!this.editingPendingOrder) {
        this.showFormError('No hay orden pendiente seleccionada para eliminar.');
        return;
      }

      // usamos tu función que ya cancela la orden en Supabase
      await this.cancelPendingOrder(this.editingPendingOrder);

      // volvemos al formulario normal de Market Execution
      this.resetTradingFormToMarketExecution();
    },


    /* ==================================================================
    MOSTRAR ERRORES EN EL TRADINGFORM
    ================================================================== */
    showFormError(msg: string): void {
      this.formErrorMessage = msg;

      // borrar el mensaje después de 4 segundos
      setTimeout((): void => {
        if (this.formErrorMessage === msg) {
          this.formErrorMessage = null;
        }
      }, 4000);
    },


    /* ==================================================================
    ELIMINAR TAKE PROFIT Y STOP LOSS DE LAS OPEN POSITIONS CON X
    ================================================================== */
    async clearPositionSL(pos: any): Promise<void> {
      if (!this.currentUser || !this.activeAccountId) {
        this.showFormError('Necesitas iniciar sesión para modificar la posición.');
        return;
      }
      if (!pos || !pos.id) return;

      try {
        this.tradingLoading = true;
        this.tradingError = null;

        const { data: updated, error } = await supabase
          .from('positions')
          .update({ stop_loss: null })
          .eq('id', pos.id)
          .eq('user_id', this.currentUser.id)
          .select()
          .single();

        if (error) throw error;

        // refrescar tablas
        await this.loadOpenPositions();
        await this.loadHistory();

        // si justo la estás editando en el form, sincroniza
        if (this.editingPosition && this.editingPosition.id === pos.id) {
          this.editingPosition = updated;
          this.stopLoss = null;
        }

        const symbol: string = this.activeInstrumentSymbol || 'Symbol';
        const sideLabel: string = updated.side === 'buy' ? 'buy' : 'sell';

        this.showTradeAlert({
          kind: 'modify',
          side: updated.side,
          sideLabel,
          title: `${symbol} ${sideLabel}`,
          text: `Remove SL ${updated.quantity_lots} @ ${updated.avg_entry_price} (#${updated.ticket})`,
          status: 'Terminado',
        });

      } catch (err: any) {
        console.error('Error al quitar SL:', err);
        this.tradingError = err.message ?? 'Error al quitar Stop Loss.';
        // ✅ FIX TS
        this.showFormError(String(this.tradingError));
      } finally {
        this.tradingLoading = false;
      }
    },


    async clearPositionTP(pos: any): Promise<void> {
      if (!this.currentUser || !this.activeAccountId) {
        this.showFormError('Necesitas iniciar sesión para modificar la posición.');
        return;
      }
      if (!pos || !pos.id) return;

      try {
        this.tradingLoading = true;
        this.tradingError = null;

        const { data: updated, error } = await supabase
          .from('positions')
          .update({ take_profit: null })
          .eq('id', pos.id)
          .eq('user_id', this.currentUser.id)
          .select()
          .single();

        if (error) throw error;

        // refrescar tablas
        await this.loadOpenPositions();
        await this.loadHistory();

        // si está en edición, sincroniza el form
        if (this.editingPosition && this.editingPosition.id === pos.id) {
          this.editingPosition = updated;
          this.takeProfit = null;
        }

        const symbol: string = this.activeInstrumentSymbol || 'Symbol';
        const sideLabel: string = updated.side === 'buy' ? 'buy' : 'sell';

        this.showTradeAlert({
          kind: 'modify',
          side: updated.side,
          sideLabel,
          title: `${symbol} ${sideLabel}`,
          text: `Remove TP ${updated.quantity_lots} @ ${updated.avg_entry_price} (#${updated.ticket})`,
          status: 'Terminado',
        });

      } catch (err: any) {
        console.error('Error al quitar TP:', err);
        this.tradingError = err.message ?? 'Error al quitar Take Profit.';
        // ✅ FIX: convertir a string
        this.showFormError(String(this.tradingError));
      } finally {
        this.tradingLoading = false;
      }
    },


    /* ==================================================================
    TRADINGFORM (ABRE CON UN CLICK Y DBCLICK LAS POSITIONS Y ORDERS)
    ================================================================== */
    onPositionDblClick(pos: any): void {
      // Si el formulario está cerrado, lo abrimos con doble click
      if (!this.showTradingForm) {
        this.openTradingFormForPosition(pos);
      }
    },


    onPositionClick(pos: any): void {
      // Si el formulario ya está abierto, con un click cambiamos la posición cargada
      if (this.showTradingForm) {
        this.openTradingFormForPosition(pos);
      }
    },


    onPendingDblClick(ord: any): void {
      // Formulario cerrado → abrir con doble click
      if (!this.showTradingForm) {
        this.openTradingFormForPending(ord);
      }
    },


    onPendingClick(ord: any): void {
      // Formulario abierto → un click para cargar esa pending
      if (this.showTradingForm) {
        this.openTradingFormForPending(ord);
      }
    },


    /* =========================================================
    ALERTS DE OPERACIONES 
    ========================================================= */
    showTradeAlert(payload: any): void {
      const id = Date.now() + Math.random();

      const alert = {
        id,
        kind: payload.kind || 'market',
        title: payload.title || '',
        text: payload.text || '',
        side: payload.side || null as 'buy' | 'sell' | null,
        sideLabel: payload.sideLabel || payload.side || '',
        status: payload.status || null
      };

      this.tradeAlerts.push(alert);

      setTimeout((): void => {
        this.tradeAlerts = this.tradeAlerts.filter(a => a.id !== id);
      }, payload.durationMs || 6000);
    },


    /* =========================================================
    DIV TIPO ALERT DE OPERACIONES 
    ========================================================= */
    showOrderResultPanelWith(data: any): void {
      this.orderResultPanel = {
        ticket: data.ticket,
        side: data.side,
        sideLabel: data.sideLabel || data.side,
        volume: data.volume,
        symbol: data.symbol,
        price: data.price,
        status: data.status || 'Terminado',
      };
      this.showOrderResultPanel = true;
    },


    closeOrderResultPanel(): void {
      this.showOrderResultPanel = false;
    },


    /* =========================================================
    TRADINGVIEW – Cargar tv.js una sola vez
    ========================================================= */
    ensureTradingViewScriptLoaded(): Promise<void> {
      return new Promise((resolve, reject) => {
        // Ya está disponible
        if ((window as any).TradingView) {
          this.tvScriptLoaded = true;
          resolve();
          return;
        }

        // Ya existe el <script> pero aún no se ha resuelto
        const existing = document.getElementById('tradingview-script') as HTMLScriptElement | null;
        if (existing) {
          existing.addEventListener('load', () => {
            this.tvScriptLoaded = true;
            resolve();
          });
          existing.addEventListener('error', () => {
            reject(new Error('No se pudo cargar TradingView tv.js'));
          });
          return;
        }

        // Crear <script> nuevo
        const script = document.createElement('script');
        script.id = 'tradingview-script';
        script.type = 'text/javascript';
        script.src = 'https://s3.tradingview.com/tv.js';

        script.onload = () => {
          this.tvScriptLoaded = true;
          resolve();
        };
        script.onerror = () => {
          reject(new Error('No se pudo cargar TradingView tv.js'));
        };

        document.body.appendChild(script);
      });
    },


    /* =========================================================
    GRÁFICO TRADINGVIEW – tv.js con una sola instancia
    ========================================================= */
    async initTradingViewWidget(tvSymbol?: string): Promise<void> {
      const vm = this as any;

      const container = this.$refs.tvWidgetContainer as HTMLElement | undefined;
      if (!container) {
        console.warn('[TV] No se encontró el contenedor del widget');
        return;
      }

      // 🔥 CLAVE: esperar a que el contenedor tenga tamaño REAL
      await this.waitForVisibleContainer(container);

      const symbol: string =
        tvSymbol || vm.activeInstrumentTvSymbol || 'FX:EURUSD';

      vm.activeInstrumentTvSymbol = symbol;

      // 🔒 Loader SOLO en la primera carga real
      const isFirstLoad = !this.tvInitialLoadDone;

      if (isFirstLoad) {
        this.tvLoading = true;
        this.chartLoading = true;
      }

      // 1️⃣ Asegurar tv.js
      try {
        await this.ensureTradingViewScriptLoaded();
      } catch (err) {
        console.error('[TV] Error cargando tv.js', err);
        this.tvLoading = false;
        this.chartLoading = false;
        return;
      }

      // 2️⃣ Si ya existe widget → SOLO cambiar símbolo (NO loader)
      if (vm.tvWidget && typeof vm.tvWidget.chart === 'function') {
        const chart = vm.tvWidget.chart();
        if (chart && typeof chart.setSymbol === 'function') {
          chart.setSymbol(symbol);
          console.log('[TV] setSymbol →', symbol);
          return;
        }
      }

      // 3️⃣ Primera creación del widget
      const WIDGET_ID = 'tv-main-widget';

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      const widgetDiv = document.createElement('div');
      widgetDiv.id = WIDGET_ID;
      widgetDiv.style.width = '100%';
      widgetDiv.style.height = '100%';
      container.appendChild(widgetDiv);

      vm.tvWidget = new (window as any).TradingView.widget({
        symbol,
        container_id: WIDGET_ID,
        interval: 'D',
        locale: 'en',
        timezone: 'Etc/UTC',
        theme: 'dark',
        autosize: true,
        hide_side_toolbar: false,
        hide_top_toolbar: false,
        hide_legend: true,
        withdateranges: false,
        details: false,
        hotlist: false,
        calendar: false,
        hide_volume: true,
        studies: [],
        save_image: false,
      });

      // 🔓 SOLO se ejecuta UNA vez en toda la vida del widget
      vm.tvWidget.onChartReady(() => {
        if (!this.tvInitialLoadDone) {
          this.tvInitialLoadDone = true;
          // ✅ APAGAR loaders
          this.tvLoading = false;
          this.chartLoading = false;
          console.log('[TV] Primera carga completada');
        }
      });

    },




    

    /* ==================================================================
    =====================================================================
    PRICE ENGINE - STREAM DE PRECIOS EN WATCHLIST
    =====================================================================
    ================================================================== */
    initPriceEngine(): void {
      // ✅ Guard: evita duplicar suscripciones/listeners si esto se llama otra vez
      const vm = this as any;
      if (vm._priceEngineInited) return; // ✅ evita duplicados
      vm._priceEngineInited = true;

      const symbols = this.watchlistSymbols;

      if (!symbols || symbols.length === 0) {
        console.warn('[PRICE] initPriceEngine sin símbolos, espera a loadWatchlistSymbols');
        return;
      }

      // Conectamos el WebSocket con los símbolos de la BD
      connectPriceStream(symbols);

      // Listener para actualizar el estado local
      onPriceTick((payload: PriceTick | PriceTick[]) => {
        const ticks = Array.isArray(payload) ? payload : [payload];

        ticks.forEach((tick) => {
          if (!tick || !tick.symbol) return;

          const symbol = tick.symbol;
          const prev = this.realTicksBySymbol[symbol] || null;

          // Guardar penúltimo y último tick REALES
          if (prev) {
            this.prevRealTicksBySymbol[symbol] = prev;
          }
          this.realTicksBySymbol[symbol] = tick;

          // 👇 precio visible anterior (lo que veía el usuario)
          const prevVisible = this.pricesBySymbol[symbol] || null;

          // Al llegar un tick real, actualizamos también el precio visible
          this.pricesBySymbol[symbol] = tick;

          // 👇 Actualizamos dirección según el BID
          if (prevVisible && prevVisible.bid != null && tick.bid != null) {
            if (tick.bid > prevVisible.bid) {
              this.priceDirectionBySymbol[symbol] = 'up';
            } else if (tick.bid < prevVisible.bid) {
              this.priceDirectionBySymbol[symbol] = 'down';
            } else {
              this.priceDirectionBySymbol[symbol] =
                this.priceDirectionBySymbol[symbol] || 'flat';
            }
          } else {
            // primer tick → lo dejamos neutro
            this.priceDirectionBySymbol[symbol] =
              this.priceDirectionBySymbol[symbol] || 'flat';
          }
        });
      });
    },



    /* =========================================================
    Cargar los últimos precios desde instrument_quotes
    ========================================================= */
    async preloadQuotesFromSupabase(): Promise<void> {
      try {
        // Asegurarnos de tener instrumentos cargados (id -> symbol)
        if (!this.instruments || this.instruments.length === 0) {
          await this.loadInstruments();
        }

        const { data, error } = await supabase
          .from('instrument_quotes')
          .select('instrument_id, bid, ask, last, updated_at');

        if (error) {
          console.error('[QuotesPreload] Error leyendo instrument_quotes:', error);
          return;
        }

        if (!data) return;

        // Mapa rápido id -> symbol usando this.instruments
        const idToSymbol = new Map<string, string>();

        this.instruments.forEach((inst: Instrument) => {
          idToSymbol.set(inst.id, inst.symbol);
        });

        const now = Date.now();

        (data as any[]).forEach((row) => {
          const symbol = idToSymbol.get(row.instrument_id);
          if (!symbol) return;
          if (row.bid == null || row.ask == null) return;

          const bid = Number(row.bid);
          const ask = Number(row.ask);
          const last = row.last != null ? Number(row.last) : bid;

          const tick: PriceTick = {
            symbol,
            bid,
            ask,
            last,
            // timestamp numérico, compatible con tu tipo
            timestamp: now,
          } as PriceTick;

          // Usamos esto como base inicial
          this.pricesBySymbol[symbol] = tick;
          this.realTicksBySymbol[symbol] = tick;
          this.prevRealTicksBySymbol[symbol] = tick;
        });

        console.log('[QuotesPreload] Cargadas últimas quotes desde instrument_quotes');

      } catch (err) {
        console.error('[QuotesPreload] Error inesperado:', err);
      }
    },


    /* =========================================================
    FORMATOS (miles con espacio + punto decimal)
    ========================================================= */
    formatPrice(value: number | string | null | undefined, symbol?: string): string {
      if (value == null || value === '') return '-';

      const sym = symbol || this.activeInstrumentSymbol || '';
      const digits =
        this.digitsBySymbol?.[sym] != null
          ? Number(this.digitsBySymbol[sym])
          : 5; // fallback seguro

      return formatSpaceNumber(value, digits);
    },



    formatProfit(value: number | null | undefined): string {
      return formatSpaceNumber(value, 2);
    },


    formatMoney(value: number | null | undefined): string {
      // balance, equity, margin, free margin, etc.
      return formatSpaceNumber(value ?? 0, 2);
    },


    /* =========================================================
    PRICE ENGINE - SUPABASE
    ========================================================= */
    async loadInstruments() {
      const { data, error } = await supabase
        .from('instruments')
        .select(`
          id,
          symbol,
          symbol_tradingview,
          digits,
          contract_size,
          spread_min,
          spread_max
        `); // 👈 aquí ya viene contract_size

      if (error) {
        console.error(error);
        return;
      }

      this.instruments = data || [];

      const digitsMap: Record<string, number> = {};
      const spreadMinMap: Record<string, number | null> = {};
      const spreadMaxMap: Record<string, number | null> = {};
      const contractSizeMap: Record<string, number> = {};

      this.instruments.forEach((inst: any) => {
        const symbol = inst.symbol;
        if (!symbol) return;

        const digits =
          inst.digits != null ? Number(inst.digits) : 5;
        digitsMap[symbol] = digits;

        const contractSize =
          inst.contract_size != null ? Number(inst.contract_size) : 100000;
        contractSizeMap[symbol] = contractSize;

        spreadMinMap[symbol] =
          inst.spread_min != null ? Number(inst.spread_min) : null;

        spreadMaxMap[symbol] =
          inst.spread_max != null ? Number(inst.spread_max) : null;
      });

      this.digitsBySymbol = digitsMap;
      this.spreadMinBySymbol = spreadMinMap;
      this.spreadMaxBySymbol = spreadMaxMap;
      this.contractSizeBySymbol = contractSizeMap;
    },


    /* ==================================================================
    SUPABASE – CARGAR SÍMBOLOS PARA EL WATCHLIST
    ================================================================== */
    async loadWatchlistSymbols(): Promise<void> {
      try {
        const { data, error } = await supabase
          .from('instruments')
          .select('symbol')
          // .eq('is_active', true)
          .order('symbol', { ascending: true });

        if (error) throw error;

        this.watchlistSymbols = (data || [])
          .map((row: any) => row.symbol)
          .filter((s: string | null) => !!s);

        if (this.watchlistSymbols.length > 0) {
          this.initPriceEngine();
        } else {
          console.warn('[WATCHLIST] No se encontraron símbolos en instruments');
        }
      } catch (err) {
        console.error('Error al cargar símbolos del watchlist:', err);
      }
    },


    /* ==================================================================
    Método helper para obtener el precio “de mercado” de la posición
    ================================================================== */
    animatePricesStep(): void {
      console.log('[Watchlist] animatePricesStep tick');

      if (!this.watchlistSymbols || !this.watchlistSymbols.length) return;

      this.watchlistSymbols.forEach((symbol: string) => {
        const current = this.pricesBySymbol[symbol];
        if (!current || current.bid == null || current.ask == null) return;

        const bidNum = Number(current.bid);
        const askNum = Number(current.ask);
        if (!Number.isFinite(bidNum) || !Number.isFinite(askNum)) return;

        const prevTick = this.prevRealTicksBySymbol[symbol] || null;
        const lastTick = this.realTicksBySymbol[symbol] || current;

        // Digits desde Supabase (o 5 por defecto)
        const configuredDigits =
          this.digitsBySymbol && this.digitsBySymbol[symbol] != null
            ? this.digitsBySymbol[symbol]
            : 5;

        const decimals = configuredDigits;

        let newBid: number = bidNum;
        let newAsk: number = askNum;

        const hasTwoTicks =
          prevTick &&
          prevTick.bid != null &&
          prevTick.ask != null &&
          lastTick &&
          lastTick.bid != null &&
          lastTick.ask != null;

        // ---- CASO 1: NO tenemos 2 ticks buenos → jitter sencillo ----
        const jitterAroundCurrent = () => {
          const maxPercentMove = 0.0002; // 0.02 %

          const factorBid = 1 + (Math.random() * 2 - 1) * maxPercentMove;
          const factorAsk = 1 + (Math.random() * 2 - 1) * maxPercentMove;

          newBid = bidNum * factorBid;
          newAsk = askNum * factorAsk;
        };

        if (!hasTwoTicks) {
          jitterAroundCurrent();
        } else {
          // ---- CASO 2: sí hay 2 ticks reales → random entre min y max ----
          const prevBidNum = Number(prevTick.bid);
          const lastBidNum = Number(lastTick.bid);
          const prevAskNum = Number(prevTick.ask);
          const lastAskNum = Number(lastTick.ask);

          const bidMin = Math.min(prevBidNum, lastBidNum);
          const bidMax = Math.max(prevBidNum, lastBidNum);
          const askMin = Math.min(prevAskNum, lastAskNum);
          const askMax = Math.max(prevAskNum, lastAskNum);

          const baseBidRange = bidMax - bidMin;
          const baseAskRange = askMax - askMin;

          // Umbral mínimo de rango: ~2 “ticks” según los decimales
          const minRange = Math.pow(10, -decimals) * 2;

          const rangeTooSmall =
            baseBidRange < minRange && baseAskRange < minRange;

          if (rangeTooSmall) {
            // Rango ridículo → mejor jitter alrededor del actual
            jitterAroundCurrent();
          } else {
            // Rango decente → random dentro de [min, max]
            const randBid = bidMin + Math.random() * baseBidRange;
            const randAsk = askMin + Math.random() * baseAskRange;

            newBid = randBid;
            newAsk = randAsk;
          }
        }

        // ============================================================
        //  🔒 FORZAR SPREAD entre spread_min y spread_max (en PIPS)
        // ============================================================
        const spreadMinPips =
          this.spreadMinBySymbol && this.spreadMinBySymbol[symbol] != null
            ? Number(this.spreadMinBySymbol[symbol])
            : null;

        const spreadMaxPips =
          this.spreadMaxBySymbol && this.spreadMaxBySymbol[symbol] != null
            ? Number(this.spreadMaxBySymbol[symbol])
            : null;

        // Igual que en el price-engine: pip = 10^(-(digits-1))
        const pipSize =
          decimals && decimals > 0 ? Math.pow(10, -(decimals - 1)) : 0;

        let minSpread =
          spreadMinPips != null && pipSize > 0
            ? spreadMinPips * pipSize
            : 0;

        let maxSpread =
          spreadMaxPips != null && pipSize > 0
            ? spreadMaxPips * pipSize
            : Infinity;

        let spread = newAsk - newBid;

        // Si algo raro pasó y el spread no es válido, usamos al menos minSpread
        if (!Number.isFinite(spread) || spread <= 0) {
          if (minSpread <= 0) {
            // 2 pips por defecto si no hay nada configurado
            minSpread = pipSize > 0 ? pipSize * 2 : 0.00001;
          }
          spread = minSpread;
        }

        // Ajustar al rango [minSpread, maxSpread]
        if (minSpread > 0 && spread < minSpread) {
          spread = minSpread;
        }
        if (maxSpread !== Infinity && spread > maxSpread) {
          spread = maxSpread;
        }

        // Re-centrar el Bid/Ask alrededor de un mid
        const midBase =
          Number.isFinite(newBid) && Number.isFinite(newAsk)
            ? (newBid + newAsk) / 2
            : Number.isFinite(bidNum)
            ? bidNum
            : askNum;

        const halfSpread = spread / 2;
        newBid = midBase - halfSpread;
        newAsk = midBase + halfSpread;

        // ============================================================
        //  Dirección (up/down) para colorear precio e icono
        // ============================================================
        let newDirection: 'up' | 'down' | 'flat' =
          this.priceDirectionBySymbol[symbol] || 'flat';

        if (newBid > bidNum) {
          newDirection = 'up';
        } else if (newBid < bidNum) {
          newDirection = 'down';
        }

        // Guardamos en el mapa final con los decimales correctos
        this.pricesBySymbol[symbol] = {
          ...current,
          bid: Number(newBid.toFixed(decimals)),
          ask: Number(newAsk.toFixed(decimals)),
        };

        this.priceDirectionBySymbol[symbol] = newDirection;
      });
    },


    /* ==================================================================
    Método central: seleccionar instrumento desde el watchlist
    ================================================================== */
    // Seleccionar instrumento por símbolo del watchlist
    setActiveInstrumentBySymbol(symbol: string): void {
      if (!symbol) return;

      // 👇 truco para que TS deje de joder
      const vm = this as any;

      const inst = vm.instruments.find((i: any) => i.symbol === symbol);

      if (!inst) {
        console.warn('[INSTRUMENT] No se encontró instrumento para símbolo:', symbol);

        vm.activeInstrumentId = null;
        vm.activeInstrumentSymbol = symbol;
        vm.activeInstrumentTvSymbol = 'FX:EURUSD';   // fallback seguro

        // 👇 aquí ya no marca error
        vm.updateChartSymbol(vm.activeInstrumentTvSymbol);
        return;
      }

      // Guardar contexto activo
      vm.activeInstrumentId = inst.id;
      vm.activeInstrumentSymbol = inst.symbol;

      // 👇 usamos el campo correcto de Supabase
      const tvSymbol: string =
        inst.symbol_tradingview || inst.symbol || 'FX:EURUSD';

      vm.activeInstrumentTvSymbol = tvSymbol;

      // Actualizar gráfico
      vm.updateChartSymbol(tvSymbol);

    },


    updateChartSymbol(symbol: string): void {
      if (!symbol) return;

      this.initTradingViewWidget(symbol);
    },



    // Click del watchlist (wrapper pequeñito)
    onWatchlistRowClick(symbol: string): void {
      if (!symbol) return;

      (this as any).setActiveInstrumentBySymbol(symbol);
      this.syncTradingFormPrice(symbol);
    },



    /* ==================================================================
    =====================================================================
    BALANCE, EQUITY, MARGIN, FREE MARGIN, LEVEL, PROFIT 
    =====================================================================
    ================================================================== */
    // ==================== HELPERS DE CUENTA / RESUMEN ====================

    // Cuenta activa
    getActiveSubAccount(this: any): any | null {
      const subAccounts = this.subAccounts as any[] | undefined
      const activeId = this.activeAccountId

      if (!subAccounts || !activeId) return null

      return subAccounts.find((a: any) => a.id === activeId) || null
    },

    // Balance de la sub_account activa
    getActiveAccountBalance(): number {
      const acc = this.getActiveSubAccount()
      return acc && acc.balance != null ? Number(acc.balance) : 0
    },

    // Profit total de posiciones abiertas
    getTotalOpenProfit(): number {
      if (!this.openPositions || this.openPositions.length === 0) return 0

      return this.openPositions.reduce((sum: number, pos: any) => {
        const p = this.getOpenPositionProfit(pos)
        return sum + (p ?? 0)
      }, 0)
    },

    // Margin total de posiciones abiertas
    getTotalMargin(this: any): number {
      const positions = this.openPositions as any[] | undefined
      if (!positions || positions.length === 0) return 0

      return positions.reduce((sum: number, pos: any) => {
        const m = this.getPositionMargin(pos)
        return sum + (m ?? 0)
      }, 0)
    },

    getPositionMargin(this: any, pos: any): number {
      const instrument = this.instruments?.find(
        (i: any) => i.id === pos.instrument_id
      )

      const contractSize: number =
        instrument?.contract_size != null ? Number(instrument.contract_size) : 100000

      const acc = this.getActiveSubAccount()
      const leverage: number = acc?.leverage || 500

      if (!pos.avg_entry_price || !pos.quantity_lots || !leverage) return 0

      const price = pos.avg_entry_price
      const lots = pos.quantity_lots
      const notional = price * lots * contractSize

      return notional / leverage
    },

    // Equity = balance + profit abierto
    getAccountEquity(): number {
      const balance = this.getActiveAccountBalance()
      const openProfit = this.getTotalOpenProfit()
      return balance + openProfit
    },

    // Free margin = equity - margin
    getFreeMargin(): number {
      const equity = this.getAccountEquity()
      const margin = this.getTotalMargin()
      return equity - margin
    },

    // Margin level = (equity / margin) * 100
    getMarginLevel(): number {
      const equity = this.getAccountEquity()
      const margin = this.getTotalMargin()
      if (margin <= 0) return 0
      return (equity / margin) * 100
    },


    /* ==================================================================
    =====================================================================
    SUPABASE - VISUALIZAR EN SECTION POSITION (OPEN, PENDING POSITIONS)
    =====================================================================
    ================================================================== */

    /* ==================================================================
    SUPABASE - CARGAR OPEN POSITIONS
    ================================================================== */
    async loadOpenPositions(): Promise<void> {
      try {
        this.openPositionsLoading = true;
        this.openPositionsError = null;

        if (!this.currentUser || !this.activeAccountId) {
          this.openPositions = [];
          return;
        }

        const { data, error } = await supabase
          .from('positions')
          .select(`
            id,
            user_id,
            account_id,
            instrument_id,
            ticket,
            side,
            quantity_lots,
            avg_entry_price,
            take_profit,
            stop_loss,
            status,
            opened_at,
            comment,
            symbol,
            swaptext,
            datetext
          `)
          .eq('user_id', this.currentUser.id)
          .eq('account_id', this.activeAccountId)
          .eq('status', 'open')
          .order('opened_at', { ascending: false });

        if (error) throw error;

        this.openPositions = data || [];
        console.log('Posiciones abiertas cargadas:', this.openPositions);

      } catch (err: any) {
        console.error('Error al cargar posiciones abiertas:', err);
        this.openPositionsError =
          err.message ?? 'Error al cargar posiciones abiertas';
      } finally {
        this.openPositionsLoading = false;
      }
    },


    /* ==================================================================
    SUPABASE - CARGAR PENDING POSITIONS
    ================================================================== */
    async loadPendingOrders(): Promise<void> {
      try {
        this.pendingOrdersLoading = true;
        this.pendingOrdersError = null;

        if (!this.currentUser || !this.activeAccountId) {
          this.pendingOrders = [];
          return;
        }

        const { data, error } = await supabase
          .from('orders')
          .select(`
            id,
            user_id,
            account_id,
            instrument_id,
            ticket,
            side,
            execution,
            time_in_force,
            quantity_lots,
            price,
            stop_price,
            take_profit,
            stop_loss,
            status,
            placed_at,
            comment,
            symbol
          `)
          .eq('user_id', this.currentUser.id)
          .eq('account_id', this.activeAccountId)
          .eq('status', 'pending')
          .order('placed_at', { ascending: false });

        if (error) throw error;

        this.pendingOrders = data || [];
        console.log('Órdenes pendientes cargadas:', this.pendingOrders);

      } catch (err: any) {
        console.error('Error al cargar órdenes pendientes:', err);
        this.pendingOrdersError =
          err.message ?? 'No se pudieron cargar las órdenes pendientes.';
      } finally {
        this.pendingOrdersLoading = false;
      }
    },


    /* ==================================================================
    SUPABASE - CARGAR HISTORY
    ================================================================== */
    async loadHistory(): Promise<void> {
      if (!this.currentUser || !this.activeAccountId) return;

      this.historyLoading = true;
      this.historyError = null;

      const num = (v: any): number | null =>
        v === null || v === undefined ? null : Number(v);

      try {
        const [
          { data: posData, error: posError },
          { data: ordData, error: ordError },
          { data: ledData, error: ledError }
        ] = await Promise.all([
          // 1) POSITIONS cerradas (DEALS)
          supabase
            .from('positions')
            .select('*')
            .eq('user_id', this.currentUser.id)
            .eq('account_id', this.activeAccountId)
            .eq('status', 'closed'),

          // 2) ORDERS históricas
          supabase
            .from('orders')
            .select('*')
            .eq('user_id', this.currentUser.id)
            .eq('account_id', this.activeAccountId)
            .in('status', ['cancelled', 'rejected', 'expired']),

          // 3) MOVIMIENTOS DE DINERO (account_ledger)
          supabase
            .from('account_ledger')
            .select('*')
            .eq('user_id', this.currentUser.id)
            .eq('sub_account_id', this.activeAccountId)
        ]);

        if (posError) throw posError;
        if (ordError) throw ordError;
        if (ledError) throw ledError;

        const rows: any[] = [];

        // ========== 3) CASH: account_ledger ==========
        (ledData || []).forEach((mov: any) => {
          let profit = num(mov.amount);
          let volumeText = '';
          const ticket = mov.id; // luego lo acortas con shortTicket(row.ticket)

          switch (mov.type) {
            case 'deposit':
              volumeText = `Deposit: ${mov.comment || ''}`.trim();
              // depósito → positivo
              break;

            case 'withdrawal':
              volumeText = `Withdrawal: ${mov.comment || ''}`.trim();
              // retiro → negativo
              profit = profit != null ? -Math.abs(profit) : null;
              break;

            case 'transfer_in':
              volumeText = `Transfer in: ${mov.comment || ''}`.trim();
              // entra dinero (positivo)
              break;

            case 'transfer_out':
              volumeText = `Transfer out: ${mov.comment || ''}`.trim();
              // sale dinero (negativo)
              profit = profit != null ? -Math.abs(profit) : null;
              break;

            case 'adjustment':
              volumeText = `Adjustment: ${mov.comment || ''}`.trim();
              // aquí dejamos el signo tal cual venga en amount
              break;
          }

          rows.push({
            kind: 'cash',
            timeOpen: mov.created_at,
            ticket,
            type: 'Balance',
            volumeText,
            symbol: null,
            priceOpen: null,
            sl: null,
            tp: null,
            timeClose: null,
            priceClose: null,
            commission: null,
            fee: null,
            swap: null,
            profit,
            comment: mov.comment || ''
          });
        });

        // ========== 1) POSITIONS cerradas ==========
        (posData || []).forEach((pos: any) => {
          rows.push({
            kind: 'position',
            timeOpen: pos.opened_at,
            ticket: pos.ticket,
            type: pos.side, // 'buy' / 'sell'
            volumeText:
              pos.quantity_lots != null ? String(pos.quantity_lots) : null,
            symbol: pos.symbol || null,
            priceOpen: num(pos.avg_entry_price),
            sl: num(pos.stop_loss),
            tp: num(pos.take_profit),
            timeClose: pos.closed_at,
            priceClose: num(pos.close_price),
            commission: num(pos.commission_accrued),
            fee: null,
            swap: num(pos.swap_accrued),
            profit: num(pos.pnl_closed),
            comment: pos.comment || ''
          });
        });

        // ========== 2) ORDERS históricas ==========
        (ordData || []).forEach((ord: any) => {
          const exec = ord.execution || 'market';
          let typeLabel = ord.side || '';

          if (exec === 'limit') typeLabel += ' limit';
          else if (exec === 'stop') typeLabel += ' stop';
          else if (exec === 'stop_limit') typeLabel += ' stop limit';
          // si es market o no viene ejecución, se queda solo buy / sell

          rows.push({
            kind: 'order',
            timeOpen: ord.placed_at,
            ticket: ord.ticket,
            type: typeLabel,
            volumeText:
              ord.quantity_lots != null ? String(ord.quantity_lots) : null,
            symbol: ord.symbol || null,
            priceOpen: num(ord.price ?? ord.stop_price),
            sl: num(ord.stop_loss),
            tp: num(ord.take_profit),
            timeClose: ord.filled_at || ord.cancelled_at || null,
            priceClose: num(ord.avg_fill_price),
            commission: null,
            fee: null,
            swap: null,
            profit: null,
            comment: ord.comment || ''
          });
        });

        // ========== Ordenar por fecha (más reciente arriba) ==========
        const getDate = (r: any): Date =>
          r.timeClose
            ? new Date(r.timeClose)
            : r.timeOpen
            ? new Date(r.timeOpen)
            : new Date(0);

        rows.sort((a, b) => getDate(b).getTime() - getDate(a).getTime());

        this.historyRows = rows;
      } catch (err: any) {
        console.error('Error al cargar history:', err);
        this.historyError = 'No se pudo cargar el historial.';
      } finally {
        this.historyLoading = false;
      }
    },


    async loadHistorySummary(): Promise<void> {
      if (!this.currentUser || !this.activeAccountId) return;

      // reset rápido
      this.historySummary = {
        profit: 0,
        credit: 0,
        deposit: 0,
        withdrawal: 0,
        fee: 0,
        swap: 0,
        net: 0,
      };

      const n = (v: any) => (v == null ? 0 : Number(v) || 0);

      try {
        // 1️⃣ POSITIONS cerradas → profit real de trading
        const { data: posData, error: posErr } = await supabase
          .from('positions')
          .select('pnl_closed, swap_accrued, commission_accrued')
          .eq('account_id', this.activeAccountId)
          .eq('status', 'closed');

        if (posErr) throw posErr;

        const profit = (posData || []).reduce((a, r) => a + n(r.pnl_closed), 0);
        const swap   = (posData || []).reduce((a, r) => a + n(r.swap_accrued), 0);
        const fee    = (posData || []).reduce((a, r) => a + n(r.commission_accrued), 0);

        // 2️⃣ LEDGER → solo movimientos de dinero
        const { data: ledData, error: ledErr } = await supabase
          .from('account_ledger')
          .select('type, amount')
          .eq('sub_account_id', this.activeAccountId);

        if (ledErr) throw ledErr;

        const sumLedger = (t: string) =>
          (ledData || [])
            .filter(r => r.type === t)
            .reduce((a, r) => a + n(r.amount), 0);

        const deposit    = sumLedger('deposit');
        const withdrawal = sumLedger('withdrawal');
        const credit     = sumLedger('credit');

        this.historySummary.profit = profit;
        this.historySummary.swap = swap;
        this.historySummary.fee = fee;
        this.historySummary.deposit = deposit;
        this.historySummary.withdrawal = withdrawal;
        this.historySummary.credit = credit;

        // Neto MT5-style
        this.historySummary.net = profit - fee + swap;

      } catch (err) {
        console.error('loadHistorySummary error:', err);
      }
    },


    /* ==================================================================
    FORMATO DE TABLA - FECHA 2024.12.01 11:49:25
    ================================================================== */
    formatDateTime(value: any): string {
      if (!value) return '-';

      const d = new Date(value);
      if (isNaN(d.getTime())) return '-'; // por si llega algo raro

      const pad = (n: number): string => String(n).padStart(2, '0');

      const year   = d.getFullYear();
      const month  = pad(d.getMonth() + 1);
      const day    = pad(d.getDate());
      const hour   = pad(d.getHours());
      const minute = pad(d.getMinutes());
      const second = pad(d.getSeconds());

      // 👉 2025.12.01 11:49:25
      return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
    },


    /* ==================================================================
    FORMATO DE TABLA - TICKET DE 8 NUMEROS
    ================================================================== */
    shortTicket(id: any): string {
      if (!id) return '';

      const s = String(id);

      // Si ya es número "normal" (todo dígitos y long ≤ 10), lo devolvemos tal cual
      if (/^\d+$/.test(s) && s.length <= 10) {
        return s;
      }

      // Para cosas como UUID (ledger, etc.) recortamos los últimos 8 caracteres
      const clean = s.replace(/-/g, '');
      return clean.slice(-8);
    },


    /* ==================================================================
    FORMATO DE TABLA - NUMERO ALEATORIO ENTRE 10,000,000 y 99,999,999
    ================================================================== */
    generateTicketNumber(): number {
      const min = 10_000_000;
      const max = 99_999_999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },


    /* ==================================================================
    FORMATO DE TABLA - TYPE: BUY, SELL, BUY LIMIT, SELL LIMIT, BUY STOP, SELL STOP, ETC
    ================================================================== */
    formatOrderType(ord: any): string {
      if (!ord) return '';

      const side: string = ord.side || '';
      const exec: string = ord.execution || 'market';

      if (exec === 'market') return side;                 // buy / sell
      if (exec === 'limit') return `${side} limit`;       // buy limit, sell limit
      if (exec === 'stop') return `${side} stop`;         // buy stop, sell stop
      if (exec === 'stop_limit') return `${side} stop limit`; // buy stop limit, sell stop limit

      return side;
    },


    /* ==================================================================
    SUPABASE - SIGNUP
    ================================================================== */
    async signUp(): Promise<void> {
      this.authLoading = true;
      this.authError = null;

      try {
        const { data, error } = await supabase.auth.signUp({
          email: this.authEmail,
          password: this.authPassword,
        });

        if (error) throw error;

        console.log('SignUp OK:', data);
        alert('Revisa tu correo para confirmar la cuenta (si lo tienes activado en Supabase).');

      } catch (err: any) {
        console.error('Error signUp:', err);
        this.authError = err.message;
      } finally {
        this.authLoading = false;
      }
    },


    /* ==================================================================
    SUPABASE - LOGIN
    ================================================================== */
    async signIn(): Promise<void> {
      this.authError = null;
      this.authLoading = true;

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: this.authEmail,
          password: this.authPassword,
        });

        if (error) throw error;

        console.log('SignIn OK:', data);
        this.currentUser = data.user;

        // 🔥 Cerrar modal y pasar al tab de cuentas
        this.showAccountsModal = false;
        this.accountsTab = 'account';

        // 1️⃣ CARGA SUBCUENTAS
        await this.loadSubAccounts();

        // 2️⃣ “Seleccionar subcuenta por defecto” SIN inventar funciones:
        //    - garantiza que haya activeAccountId / selectedSubAccountId coherentes
        if (this.subAccounts && this.subAccounts.length > 0) {
          // Si por algo no quedó set, forzamos primera
          if (!this.activeAccountId) {
            this.activeAccountId = this.subAccounts[0].id;
          }
          // Selección del modal apunta a la activa
          this.selectedSubAccountId = this.activeAccountId;
        }

        // 3️⃣ Cargar contexto por defecto (cuenta + instrumento)
        //    (esto también puede setear activeAccountId)
        await this.loadDefaultTradingContext();

        // 4️⃣ CLAVE: esperar a que Vue aplique el estado antes de cargar tablas
        await this.$nextTick();

        // 🧱 Guard mínimo: si no hay cuenta activa, no intentes cargar
        if (!this.activeAccountId) {
          throw new Error('No se encontró una subcuenta activa para cargar datos.');
        }

        // 5️⃣ CARGAS DEPENDIENTES DE activeAccountId
        await this.loadOpenPositions();
        await this.loadPendingOrders();
        await this.loadHistory();
        await this.loadHistorySummary();

        // (Opcional) limpiar password ya logueado
        // this.authPassword = '';

      } catch (err: any) {
        console.error('Error signIn:', err);
        this.authError = err.message || 'Error iniciando sesión';
      } finally {
        this.authLoading = false;
      }
    },


    /* ==================================================================
      SUPABASE - LOGOUT
    ================================================================== */
    async signOut(): Promise<void> {
      this.authLoading = true;
      this.authError = null;

      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        // 🔐 limpiar estado de sesión
        this.currentUser = null;
        this.activeSubAccount = null;
        this.selectedSubAccountId = null;
        this.activeAccountId = null;

        // 🧠 reset UI (CLAVE)
        this.accountsTab = 'login';

        // 🔑 limpiar credenciales
        this.authPassword = '';

      } catch (err: any) {
        console.error('Error signOut:', err);
        this.authError = err.message;

      } finally {
        this.authLoading = false;
      }
    },





    /* ==================================================================
    =====================================================================
    MODAL LOGIN, DEMO ACCOUNT, REAL ACCOUNT
    =====================================================================
    ================================================================== */
    openAccountsModal(): void {
      // ✅ Si ya hay sesión, abre en "account"; si no, en "login"
      this.accountsTab = this.currentUser ? 'account' : 'login';

      this.showAccountsModal = true;
      this.closeMainMenu();

      // mostrar por defecto la activa (si existe)
      this.selectedSubAccountId = this.activeAccountId;
    },


    setSelectedSubAccount(acc: any): void {
      if (!acc || !acc.id) return
      this.selectedSubAccountId = acc.id
    },


    closeAccountsModal(): void {
      this.showAccountsModal = false;
    },


    toggleMainMenu(): void {
      this.showMainMenu = !this.showMainMenu;
    },


    openMobileAccountMenu(): void {
      this.showMainMenu = true
    },

    closeMainMenu(): void {
      this.showMainMenu = false;
    },


    /* ==================================================================
    =====================================================================
    SECTION: TRADINGFORM, WATCHLIST, POSITIONS - RESIZE HANDLE
    =====================================================================
    ================================================================== */
    initResizers(): void {
      const root = this.$el as HTMLElement;

      const tradingQ   = root.querySelector('.trading-form') as HTMLElement | null;
      const watchQ     = root.querySelector('.watchlist') as HTMLElement | null;
      const positionsQ = root.querySelector('.positions') as HTMLElement | null;

      // Handles por ref
      const handleRight = this.$refs.handleRight as HTMLElement | undefined;
      const handleLeft  = this.$refs.handleLeft  as HTMLElement | undefined;
      const handleTop   = this.$refs.handleTop   as HTMLElement | undefined;

      // Limpia listeners previos
      if (this.destroyResizers) {
        this.destroyResizers();
        this.destroyResizers = null;
      }

      if (!tradingQ || !watchQ || !positionsQ || !handleRight || !handleLeft || !handleTop) {
        return;
      }

      const trading   = tradingQ;
      const watch     = watchQ;
      const positions = positionsQ;

      // Defaults
      const DEFAULT_TRADING_WIDTH = 400;
      const DEFAULT_WATCH_WIDTH   = 339;
      const DEFAULT_POSITIONS_H   = 224;

      const MIN_PANEL_WIDTH      = 180;
      const MAX_PANEL_WIDTH      = 599;
      const MIN_POSITIONS_HEIGHT = 120;

      const clamp = (v: number, min: number, max: number) =>
        Math.min(max, Math.max(min, v));

      // Tamaños iniciales (solo runtime)
      let tradingWidth = trading.getBoundingClientRect().width || DEFAULT_TRADING_WIDTH;
      let watchWidth   = watch.getBoundingClientRect().width   || DEFAULT_WATCH_WIDTH;
      let positionsHeight =
        positions.getBoundingClientRect().height || DEFAULT_POSITIONS_H;

      tradingWidth = clamp(tradingWidth, MIN_PANEL_WIDTH, MAX_PANEL_WIDTH);
      watchWidth   = clamp(watchWidth,   MIN_PANEL_WIDTH, MAX_PANEL_WIDTH);
      positionsHeight = clamp(
        positionsHeight,
        MIN_POSITIONS_HEIGHT,
        window.innerHeight * 0.5
      );

      const updateCols = () => {
        trading.style.width = `${tradingWidth}px`;
        watch.style.width   = `${watchWidth}px`;
      };

      const updateRows = () => {
        positions.style.height = `${positionsHeight}px`;
      };

      updateCols();
      updateRows();

      let dragType: 'trading' | 'watch' | 'positions' | null = null;
      let startX = 0;
      let startY = 0;
      let startWidth = 0;
      let startHeight = 0;

      const setResizingUI = (on: boolean) => {
        document.body.classList.toggle('is-resizing', on);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!dragType) return;
        e.preventDefault();

        if (dragType === 'trading') {
          tradingWidth = clamp(startWidth + (e.clientX - startX), MIN_PANEL_WIDTH, MAX_PANEL_WIDTH);
          updateCols();
        }

        if (dragType === 'watch') {
          watchWidth = clamp(startWidth + (startX - e.clientX), MIN_PANEL_WIDTH, MAX_PANEL_WIDTH);
          updateCols();
        }

        if (dragType === 'positions') {
          positionsHeight = clamp(
            startHeight + (startY - e.clientY),
            MIN_POSITIONS_HEIGHT,
            window.innerHeight * 0.5
          );
          updateRows();
        }
      };

      const onPointerUp = () => {
        dragType = null;

        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);

        handleLeft.classList.remove('active');
        handleRight.classList.remove('active');
        handleTop.classList.remove('active');

        setResizingUI(false);
      };

      const startDrag = (type: 'trading' | 'watch' | 'positions', e: PointerEvent) => {
        e.preventDefault();

        dragType = type;
        setResizingUI(true);

        if (type === 'trading') {
          startX = e.clientX;
          startWidth = trading.getBoundingClientRect().width;
          handleRight.classList.add('active');
        }

        if (type === 'watch') {
          startX = e.clientX;
          startWidth = watch.getBoundingClientRect().width;
          handleLeft.classList.add('active');
        }

        if (type === 'positions') {
          startY = e.clientY;
          startHeight = positions.getBoundingClientRect().height;
          handleTop.classList.add('active');
        }

        document.addEventListener('pointermove', onPointerMove, { passive: false });
        document.addEventListener('pointerup', onPointerUp, { passive: true });
      };

      const onRightDown = (e: PointerEvent) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        startDrag('trading', e);
      };

      const onLeftDown = (e: PointerEvent) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        startDrag('watch', e);
      };

      const onTopDown = (e: PointerEvent) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        startDrag('positions', e);
      };

      handleRight.addEventListener('pointerdown', onRightDown, { passive: false });
      handleLeft.addEventListener('pointerdown', onLeftDown, { passive: false });
      handleTop.addEventListener('pointerdown', onTopDown, { passive: false });

      this.destroyResizers = () => {
        handleRight.removeEventListener('pointerdown', onRightDown);
        handleLeft.removeEventListener('pointerdown', onLeftDown);
        handleTop.removeEventListener('pointerdown', onTopDown);

        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);

        handleLeft.classList.remove('active');
        handleRight.classList.remove('active');
        handleTop.classList.remove('active');

        setResizingUI(false);
      };
    },



    /* ==================================================================
    =====================================================================
    SECTION TARDINGFORM - SHOW, CLOSE  
    =====================================================================
    ================================================================== */
    toggleTradingForm(): void {
      if (this.isMobile) {
        // 📱 En mobile SIEMPRE usamos vistas
        this.mobileActiveView = 'trade';

        // opcional: reset solo cuando entras
        this.resetTradingFormToMarketExecution();
      } else {
        // 🖥️ Desktop: toggle normal
        this.showTradingForm = !this.showTradingForm;

        // Si LO ABRES → reset total a Market Execution
        if (this.showTradingForm) {
          this.resetTradingFormToMarketExecution();
        }
      }
    },


    resetTradingFormToMarketExecution(): void {
      // Limpia edición de posiciones
      this.editingPosition = null;
      this.editingPendingOrder = null;

      // Resetea encabezado (no mostrar ticket)
      this.editingMode = null;

      // Tipo de orden base
      this.orderType = "market";

      // Reset flags de los v-show
      this.showVolume = true;
      this.showVolumePrice = false;
      this.showPriceStopLimit = false;
      this.showSLTP = true;
      this.showExpiration = false;
      this.showComment = true;

      this.showSellBuyMarket = true;
      this.showPlaceOrderBuy = false;
      this.showPlaceOrderSell = false;

      this.showModifyButton = false;
      this.showDeletePendingButton = false;
      this.showClosePositionButton = false;

      // Limpia valores numéricos
      this.volume = 0.01;
      this.price = null;
      this.stopLimitPrice = null;
      this.stopLoss = null;
      this.takeProfit = null;
      this.expirationType = "gtc";
      this.orderComment = "";

      // EDITAR PENDING ORDERS
      this.originalPendingForm = null;
    },


    closeTradingForm(): void {
      if (this.isMobile) {
        // 📱 En mobile nunca cerramos con boolean
        this.mobileActiveView = 'chart';
      } else {
        // 🖥️ Desktop
        this.showTradingForm = false;
      }

      // ⬇️ TODO lo demás queda IGUAL que ya lo tienes

      this.showOrderResultPanel = false;

      // Reset edición
      this.editingPosition = null;
      this.editingPendingOrder = null;

      this.showModifyButton = false;
      this.showClosePositionButton = false;
      this.showDeletePendingButton = false;

      // Volver a layout NORMAL (Market Execution)
      this.orderType = 'market';

      this.showVolume = true;
      this.showVolumePrice = false;
      this.showPriceStopLimit = false;
      this.showSLTP = true;
      this.showExpiration = false;
      this.showComment = true;
      this.showSellBuyMarket = true;

      this.showPlaceOrderBuy = false;
      this.showPlaceOrderSell = false;

      // limpiar inputs
      this.volume = 0.01;
      this.price = null;
      this.stopLimitPrice = null;
      this.stopLoss = null;
      this.takeProfit = null;
      this.orderComment = '';

      // EDITAR PENDING ORDERS
      this.originalPendingForm = null;
    },


    /* ==================================================================
    =====================================================================
    SECTION WATCHLIST - SHOW, CLOSE
    =====================================================================
    ================================================================== */
    toggleWatchlist(): void {
      if (this.isMobile) {
        // 📱 Mobile → markets
        this.mobileActiveView = 'markets';
      } else {
        // 🖥️ Desktop → toggle clásico
        this.showWatchlist = !this.showWatchlist;
      }
    },


    closeWatchlist(): void {
      this.showWatchlist = false;
    },


    /* ==================================================================
    =====================================================================
    SECTION POSITIONS - SHOW, CLOSE, TABS: POSITIONS / HISTORY / JOURNAL
    =====================================================================
    ================================================================== */
    async handlePositionsTab(
      tab: 'orders' | 'history' | 'journal',
      event?: Event
    ): Promise<void> {
      // Si ya está seleccionado ese tab → lo cerramos
      if (this.activePositionsTab === tab) {
        this.activePositionsTab = null;

        if (event && event.currentTarget) {
          (event.currentTarget as HTMLElement).blur();
        }

        return;
      }

      // Si era otro o ninguno → lo abrimos en este tab
      this.activePositionsTab = tab;

      // Cargas SOLO si el usuario abre HISTORY
      if (tab === 'history') {
        await Promise.all([
          this.loadHistory(),
          this.loadHistorySummary(),
        ]);
      }
    },


  },


  watch: {

    activeSubAccount: {
      immediate: true,
      async handler(acc) {
        if (!acc?.id) return;

        // 🔄 limpiar primero
        this.openPositions = [];
        this.pendingOrders = [];

        // ⏳ esperar a que el estado reactive se aplique
        await this.$nextTick();

        // ✅ cargar usando la cuenta activa ya seteada
        await this.loadOpenPositions();
        await this.loadPendingOrders();
      }
    },


    /* ==================================================================
    =====================================================================
    TRADINGFORM INPUTS
    =====================================================================
    ================================================================== */
    orderType(newVal: string) {
      // 🛑 Si estoy editando una posición abierta o una pending, NO toco el layout.
      // El layout lo controla openTradingFormForPosition / openTradingFormForPending.
      if (this.editingPosition || this.editingPendingOrder) {
        return;
      }

      // Reset
      this.showVolume = false;
      this.showVolumePrice = false;
      this.showPriceStopLimit = false;
      this.showSLTP = true;
      this.showExpiration = false;
      this.showComment = true;
      this.showSellBuyMarket = false;
      this.showPlaceOrderBuy = false;
      this.showPlaceOrderSell = false;

      switch (newVal) {
        case "market":
          this.showVolume = true;
          this.showSellBuyMarket = true;
          break;

        case "buy_limit":
        case "buy_stop":
          this.showVolumePrice = true;
          this.showExpiration = true;
          this.showPlaceOrderBuy = true;
          break;

        case "sell_limit":
        case "sell_stop":
          this.showVolumePrice = true;
          this.showExpiration = true;
          this.showPlaceOrderSell = true;
          break;

        case "buy_stop_limit":
          this.showVolume = true;
          this.showPriceStopLimit = true;
          this.showExpiration = true;
          this.showPlaceOrderBuy = true;
          break;

        case "sell_stop_limit":
          this.showVolume = true;
          this.showPriceStopLimit = true;
          this.showExpiration = true;
          this.showPlaceOrderSell = true;
          break;
      }
    },


    /* PARA QUE NO APAREZCA EL DIV TIPO ALERT DENTRO DE TRADINGFORM */
    showTradingForm(val: boolean) {
      if (!val) {
        this.showOrderResultPanel = false;
      }
    },

    watchlistRows: {
      immediate: true,
      handler(rows) {
        if (!this.activeInstrumentSymbol && rows.length) {
          this.activeInstrumentSymbol = rows[0].symbol;
          this.syncTradingFormPrice(rows[0].symbol);
        }
      }
    },


    /* =========================================================
    COLORES DE BID ASK DE TRADING FORM A MERCADO
    ========================================================= */
    activeTick(newTick: PriceTick | null, oldTick: PriceTick | null) {
      // Primer tick (no hay dato previo) → no marcar cambio
      if (!newTick || !oldTick) {
        this.bidDirection = 'neutral';
        this.askDirection = 'neutral';
        return;
      }

      // --- BID ---
      const newBid = Number(newTick.bid);
      const oldBid = Number(oldTick.bid);

      if (Number.isFinite(newBid) && Number.isFinite(oldBid)) {
        this.bidDirection =
          newBid > oldBid ? 'up' :
          newBid < oldBid ? 'down' :
          'neutral';
      } else {
        this.bidDirection = 'neutral';
      }

      // --- ASK ---
      const newAsk = Number(newTick.ask);
      const oldAsk = Number(oldTick.ask);

      if (Number.isFinite(newAsk) && Number.isFinite(oldAsk)) {
        this.askDirection =
          newAsk > oldAsk ? 'up' :
          newAsk < oldAsk ? 'down' :
          'neutral';
      } else {
        this.askDirection = 'neutral';
      }
    },

  },


  computed: {

    /* =========================================================
    SUPABASE - SUBCUENTAS
    ========================================================= */
    activeSubAccount(): any | null {
      const id = this.selectedSubAccountId || this.activeAccountId
      if (!id || !this.subAccounts) return null
      return this.subAccounts.find((a: any) => a.id === id) || null
    },

    isInvestor() {
      return this.activeSubAccount?.role === 'investor'
    },

    mmAccountLine(): string {
      if (!this.activeSubAccount) return '';

      const login =
        this.activeSubAccount.login ||
        this.activeSubAccount.account_number ||
        '';

      const type = this.activeSubAccount.type || 'Real';
      const mode = this.activeSubAccount.mode || 'Hedge';

      return `${login} · ${type} · ${mode}`;
    },

    /* =========================================================
    TRADINGFORM - SYMBOLOS DEL WATCHLIST AL TRADINGFORM
    ========================================================= */
    activeTick(): PriceTick | null {
      const s = this.activeInstrumentSymbol;
      if (!s) return null;
      return this.pricesBySymbol[s] || null;
    },

    activeBid(): number | string {
      return this.activeTick?.bid ?? '-';
    },

    activeAsk(): number | string {
      return this.activeTick?.ask ?? '-';
    },


    /* =========================================================
    SUPABASE - WATCHLIST
    ========================================================= */
    watchlistRows() {
      return this.watchlistSymbols.map((symbol: string) => {
        const tick = this.pricesBySymbol[symbol];
        const direction = this.priceDirectionBySymbol[symbol] || 'flat'; // 'up' | 'down' | 'flat'

        return {
          symbol,
          bid: tick?.bid ?? '-',
          ask: tick?.ask ?? '-',
          last: tick?.last ?? '-',
          direction, // 👈 aquí la usamos en el template
        };
      });
    },


    /* ======== VALIDACIÓN DINÁMICA PARA NUEVAS ÓRDENES A MERCADO ======== */
    marketErrorBuy(): string | null {
      // Solo aplica cuando:
      // - formulario está abierto
      // - es orden nueva a mercado (no edición)
      if (!this.showTradingForm) return null;
      if (this.orderType !== 'market') return null;
      if (this.editingPosition || this.editingPendingOrder) return null;

      return this.validateNewMarketSlTp('buy');
    },


    marketErrorSell(): string | null {
      if (!this.showTradingForm) return null;
      if (this.orderType !== 'market') return null;
      if (this.editingPosition || this.editingPendingOrder) return null;

      return this.validateNewMarketSlTp('sell');
    },


    canClickMarketBuy(): boolean {
      // volumen válido + sin error de validación
      if (!this.volume || this.volume <= 0) return false;
      return !this.tradingLoading && !this.marketErrorBuy;
    },


    canClickMarketSell(): boolean {
      if (!this.volume || this.volume <= 0) return false;
      return !this.tradingLoading && !this.marketErrorSell;
    },


    /* =========================================================
    NUEVAS PENDING ORDERS
    ========================================================= */
    // 🔒 Deshabilita el botón Place order cuando:
    // - estás en edición (open o pending)
    // - o el formulario de pending NO pasa la validación
    isPlaceOrderDisabled(): boolean {
      // Si estás editando algo, NO deberías poder crear una nueva pending
      if (this.editingPosition || this.editingPendingOrder) {
        return true;
      }

      // Tipos que son pending
      const pendingTypes: string[] = [
        'buy_limit',
        'sell_limit',
        'buy_stop',
        'sell_stop',
        'buy_stop_limit',
        'sell_stop_limit',
      ];

      // Si no es tipo pending, por si acaso, lo dejamos desactivado
      if (!pendingTypes.includes(this.orderType)) {
        return true;
      }

      // Sacamos el side a partir del orderType
      const side: 'buy' | 'sell' = this.orderType.startsWith('sell') ? 'sell' : 'buy';

      // Usamos tu misma validación, PERO sin alert aquí
      const error = this.validatePendingOrder(side);

      // Si hay error → botón desactivado
      return !!error;
    },


    /* =========================================================
    NUEVO: estado de edición y botón MODIFICAR
    ========================================================= */
    isEditingOpenPosition(): boolean {
      return !!this.editingPosition;
    },


    isEditingPendingOrder(): boolean {
      return !!this.editingPendingOrder;
    },


    // Error de validación para la posición abierta (usar tu validador)
    modifyOpenError(): string | null {
      if (!this.showTradingForm) return null;
      if (!this.editingPosition) return null;
      return this.validateModifyOpenPosition(this.editingPosition);
    },


    // Error de validación para pending (usa tu validador central)
    pendingModifyError(): string | null {
      if (!this.showTradingForm) return null;
      if (!this.editingPendingOrder) return null;

      // Normalizamos el side a 'buy' | 'sell'
      const rawSide = String(this.editingPendingOrder.side || 'buy').toLowerCase();
      const side: 'buy' | 'sell' = rawSide === 'sell' ? 'sell' : 'buy';

      return this.validatePendingOrder(side);
    },


    // ¿La pending tiene cambios respecto al snapshot?
    hasPendingChanges(): boolean {
      if (!this.editingPendingOrder || !this.originalPendingForm) return false;

      const base = this.originalPendingForm;

      const num = (v: any): number | null =>
        v === null || v === undefined || v === '' ? null : Number(v);

      return (
        num(this.volume)          !== num(base.volume) ||
        num(this.price)           !== num(base.price) ||
        num(this.stopLimitPrice)  !== num(base.stopLimitPrice) ||
        num(this.stopLoss)        !== num(base.stopLoss) ||
        num(this.takeProfit)      !== num(base.takeProfit) ||
        (this.orderComment || '') !== (base.orderComment || '') ||
        (this.expirationType || '') !== (base.expirationType || '')
      );
    },


    // ¿se puede hacer click en Modificar cuando edito una open?
    canClickModifyPosition(): boolean {
      if (!this.editingPosition) return false;
      if (this.tradingLoading) return false;
      return !this.modifyOpenError;  // null => OK, string => bloquea
    },


    // Botón "Modificar" central (open o pending)
    canClickModify(): boolean {
      // OPEN POSITION
      if (this.editingPosition) {
        return this.canClickModifyPosition; // ya usa validateModifyOpenPosition
      }

      // PENDING ORDER
      if (this.editingPendingOrder) {
        if (this.tradingLoading) return false;
        if (!this.hasPendingChanges) return false;  // sin cambios → bloqueado
        return !this.pendingModifyError;            // validación pendiente
      }

      return false;
    },


    /* SECTION POSITIONS - SHOW, CLOSE, TABS: POSITIONS / HISTORY / JOURNAL */
    showPositions(): boolean {
      return this.activePositionsTab !== null;
    },


     /* SECTION POSITIONS - COLOR BUY SELL DEL TOTAL PROFIT USD*/
    totalProfitIsPositive() {
    return this.getTotalOpenProfit() > 0;
    },


    totalProfitIsNegative() {
      return this.getTotalOpenProfit() < 0;
    },

  },


  async mounted() {
    // 👈 EXPONEMOS LA INSTANCIA PARA DEBUG
    (window as any).app = this;

    // DESKTOP - MOBILE
    window.addEventListener('resize', this.handleResize)

    /* ==================================================================
      SUPABASE – SESIÓN, MODAL Y CARGA INICIAL
    ================================================================== */

    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error al obtener sesión:', error);
    }

    this.currentUser = data?.session?.user || null;

    if (!this.currentUser) {
      this.showAccountsModal = true;
      this.accountsTab = 'login';
    } else {

      await this.loadSubAccounts();

      /* ================================================================
        🔁 CARGAS DEPENDIENTES DE CUENTA
      ================================================================ */

      await this.loadWatchlistSymbols();
      await this.loadInstruments();
      await this.loadOpenPositions();
      await this.loadPendingOrders();
      await this.loadHistory();
      await this.loadHistorySummary();
    }

    // 👉 AHORA SÍ, la app está lista
    this.authReady = true;

    // RESIZE HANDLE
    await this.$nextTick();
    this.initResizers();


    /* ==================================================================
      PRECIOS + TRADINGVIEW
    ================================================================== */
    this.preloadQuotesFromSupabase();

    if (this.priceAnimationIntervalId) {
      clearInterval(this.priceAnimationIntervalId);
    }

    this.priceAnimationIntervalId = window.setInterval(() => {
      this.animatePricesStep();
    }, 1000);

    if (this.activeInstrumentSymbol && this.instruments.length) {
      const inst = this.instruments.find(
        (i: any) => i.symbol === this.activeInstrumentSymbol
      );

      const tvSymbol =
        inst?.symbol_tradingview || inst?.symbol || 'FX:EURUSD';

      this.activeInstrumentTvSymbol = tvSymbol;
      this.initTradingViewWidget(tvSymbol);
    } else {
      this.activeInstrumentTvSymbol = 'FX:EURUSD';
      this.initTradingViewWidget('FX:EURUSD');
    }

  },


  beforeUnmount() {

    // DESKTOP - MOBILE
    window.removeEventListener('resize', this.handleResize)

    if (this.priceAnimationIntervalId) {
      clearInterval(this.priceAnimationIntervalId);
      this.priceAnimationIntervalId = null;
    }
},


};


</script>


