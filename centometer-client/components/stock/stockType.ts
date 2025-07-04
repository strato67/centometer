export type StockInfo = {
  address1?: string;
  city?: string;
  state?: string;
  zip?: string;
  dividendRate?: number;
  dividendYield?: number;
  country?: string;
  phone?: string;
  website?: string;
  industry?: string;
  industryKey?: string;
  industryDisp?: string;
  sector?: string;
  sectorKey?: string;
  sectorDisp?: string;
  longBusinessSummary?: string;
  fullTimeEmployees?: number;
  companyOfficers?: CompanyOfficers[];
  auditRisk?: number;
  boardRisk?: number;
  compensationRisk?: number;
  shareHolderRightsRisk?: number;
  overallRisk?: number;
  governanceEpochDate?: number;
  compensationAsOfEpochDate?: number;
  irWebsite?: string;
  maxAge?: number;
  priceHint?: number;
  previousClose?: number;
  open?: number;
  dayLow?: number;
  dayHigh?: number;
  regularMarketPreviousClose?: number;
  regularMarketOpen?: number;
  regularMarketDayLow?: number;
  regularMarketDayHigh?: number;
  regularMarketPrice?:number;
  exDividendDate?: number;
  beta?: number;
  trailingPE?: number;
  forwardPE?: number;
  volume?: number;
  regularMarketVolume?: number;
  averageVolume?: number;
  averageVolume10days?: number;
  averageDailyVolume10Day?: number;
  bid?: number;
  ask?: number;
  bidSize?: number;
  askSize?: number;
  marketCap?: number;
  fiftyTwoWeekLow?: number;
  fiftyTwoWeekHigh?: number;
  priceToSalesTrailing12Months?: number;
  fiftyDayAverage?: number;
  twoHundredDayAverage?: number;
  currency?: string;
  enterpriseValue?: number;
  profitMargins?: number;
  floatShares?: number;
  sharesOutstanding?: number;
  sharesShort?: number;
  sharesShortPriorMonth?: number;
  sharesShortPreviousMonthDate?: number;
  dateShortInterest?: number;
  sharesPercentSharesOut?: number;
  heldPercentInsiders?: number;
  heldPercentInstitutions?: number;
  shortRatio?: number;
  shortPercentOfFloat?: number;
  impliedSharesOutstanding?: number;
  bookValue?: number;
  priceToBook?: number;
  lastFiscalYearEnd?: number;
  nextFiscalYearEnd?: number;
  mostRecentQuarter?: number;
  earningsQuarterlyGrowth?: number;
  netIncomeToCommon?: number;
  trailingEps?: number;
  forwardEps?: number;
  pegRatio?: number;
  lastSplitFactor?: string;
  lastSplitDate?: number;
  enterpriseToRevenue?: number;
  enterpriseToEbitda?: number;
  fiftyTwoWeekChange?: number;
  SandP52WeekChange?: number;
  exchange?: string;
  quoteType?: string;
  symbol?: string;
  underlyingSymbol?: string;
  shortName?: string;
  longName?: string;
  firstTradeDateEpochUtc?: number;
  timeZoneFullName?: string;
  timeZoneShortName?: string;
  uuid?: string;
  messageBoardId?: string;
  gmtOffSetMilliseconds?: number;
  currentPrice?: number;
  targetHighPrice?: number;
  targetLowPrice?: number;
  targetMeanPrice?: number;
  targetMedianPrice?: number;
  recommendationMean?: number;
  recommendationKey?: string;
  numberOfAnalystOpinions?: number;
  totalCash?: number;
  totalCashPerShare?: number;
  ebitda?: number;
  totalDebt?: number;
  quickRatio?: number;
  currentRatio?: number;
  totalRevenue?: number;
  debtToEquity?: number;
  revenuePerShare?: number;
  returnOnAssets?: number;
  returnOnEquity?: number;
  freeCashflow?: number;
  operatingCashflow?: number;
  earningsGrowth?: number;
  revenueGrowth?: number;
  grossMargins?: number;
  ebitdaMargins?: number;
  operatingMargins?: number;
  financialCurrency?: string;
  trailingPegRatio?: number;
};

type CompanyOfficers = {
  maxAge?: number;
  name?: string;
  age?: number;
  title?: string;
  yearBorn?: number;
  fiscalYear?: number;
  totalPay?: number;
  exercisedValue?: number;
  unexercisedValue?: number;
};

export interface AnalystConsensus {
  name: string;
  colour: string;
  text: string;
}

export type PutCallObject = {
  volume: number;
  open_interest: number;
  total_call_oi: number;
  total_put_oi: number;
  total_call_vol: number;
  total_put_vol: number;
};

type OpenInterestLevel = {
  strike: number;
  openInterest: number;
};

export type OpenInterestData = {
  support: OpenInterestLevel[];
  resistance: OpenInterestLevel[];
};

export type IVDataPoint = {
  strike: number;
  callIV: number | null;
  putIV: number | null;
}

type OptionChainRow = {
  contractSymbol: string;
  lastTradeDate: string; 
  strike: number;
  lastPrice: number;
  bid: number;
  ask: number;
  change: number;
  percentChange: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  inTheMoney: boolean;
};

export interface OptionsChain{
  calls: OptionChainRow[];
  puts: OptionChainRow[]
  option_dates?: string[]
}