data = read.csv('~/Downloads/Test2/train.csv')

preproc = subset(
  data,
  select = c(
    YearRemodAdd,
    X2ndFlrSF,
    X1stFlrSF,
    GrLivArea,
    TotalBsmtSF,
    TotRmsAbvGrd,
    SalePrice,
    GarageArea,
    YrSold,
    MoSold
  )
)
preproc = na.omit(preproc)
library(zoo)
preproc$DateSold = (sprintf("%02i//%i", preproc$MoSold, preproc$YrSold))



#with(preproc, plot(SalePrice ~ DateSold, col = TotRmsAbvGrd)) # first plot
preproc$TotalSF = preproc$TotalBsmtSF + preproc$X1stFlrSF + preproc$X2ndFlrSF
normalizeData = preproc

preproc$index_TotalSF = rep(0, nrow(preproc))
preproc$index_GarageArea = rep(0, nrow(preproc))
preproc$index_GrLivArea = rep(0, nrow(preproc))
preproc$index_GrLivArea = rep(0, nrow(preproc))
preproc$index_YearRemodAdd = rep(0, nrow(preproc))
preproc$index_Room = rep(0, nrow(preproc))
for (i in 1:8) {
  if (i == 1) {
    preproc$index_TotalSF[preproc$TotalSF >= 0 &
                            preproc$TotalSF <= range(preproc$TotalSF)[1] + diff(range(preproc$TotalSF)) /
                            8 * (i)] = i
    preproc$index_GarageArea[preproc$GarageArea >= 0 &
                               preproc$GarageArea <= range(preproc$GarageArea)[1] + diff(range(preproc$GarageArea)) /
                               8 * (i)] = i
    preproc$index_GrLivArea[preproc$GrLivArea >= 0 &
                              preproc$GrLivArea <= range(preproc$GrLivArea)[1] + diff(range(preproc$GrLivArea)) /
                              8 * (i)] = i
    preproc$index_YearRemodAdd[preproc$YearRemodAdd >= 0 &
                                 preproc$YearRemodAdd <= range(preproc$YearRemodAdd)[1] + diff(range(preproc$YearRemodAdd)) /
                                 8 * (i)] = i    
    preproc$index_Room[preproc$TotRmsAbvGrd >= 0 &
                                 preproc$TotRmsAbvGrd<= range(preproc$TotRmsAbvGrd)[1] + diff(range(preproc$TotRmsAbvGrd)) /
                                 8 * (i)] = i    
  }
  else {
    preproc$index_TotalSF[preproc$TotalSF > range(preproc$TotalSF)[1] + diff(range(preproc$TotalSF)) /
                            8 * (i - 1) &
                            preproc$TotalSF <= range(preproc$TotalSF)[1] + diff(range(preproc$TotalSF)) /
                            8 * (i)] = i
    preproc$index_GarageArea[preproc$GarageArea > range(preproc$GarageArea)[1] + diff(range(preproc$GarageArea)) /
                               8 * (i - 1) &
                               preproc$GarageArea <= range(preproc$GarageArea)[1] + diff(range(preproc$GarageArea)) /
                               8 * (i)] = i
    preproc$index_GrLivArea[preproc$GrLivArea > range(preproc$GrLivArea)[1] + diff(range(preproc$GrLivArea)) /
                              8 * (i - 1) &
                              preproc$GrLivArea <= range(preproc$GrLivArea)[1] + diff(range(preproc$GrLivArea)) /
                              8 * (i)] = i
    preproc$index_YearRemodAdd[preproc$YearRemodAdd > range(preproc$YearRemodAdd)[1] + diff(range(preproc$YearRemodAdd)) /
                                 8 * (i - 1) &
                                 preproc$YearRemodAdd <= range(preproc$YearRemodAdd)[1] + diff(range(preproc$YearRemodAdd)) /
                                 8 * (i)] = i
    preproc$index_Room[preproc$TotRmsAbvGrd > range(preproc$TotRmsAbvGrd)[1] + diff(range(preproc$TotRmsAbvGrd)) / 8 * (i - 1)
                       & preproc$TotRmsAbvGrd<= range(preproc$TotRmsAbvGrd)[1] + diff(range(preproc$TotRmsAbvGrd)) /8 * (i)] = i    
  }
}
head(preproc)


# second plot
mmrange = function(x) {
  round((x - min(x)) / (max(x) - min(x)), digits = 3)
}

normalizeData$YearRemodAdd = mmrange(preproc$YearRemodAdd)
normalizeData$TotalSF = mmrange(preproc$TotalSF)
normalizeData$GrLivArea = mmrange(preproc$GrLivArea)
normalizeData$TotRmsAbvGrd = mmrange(preproc$TotRmsAbvGrd)
normalizeData$GarageArea = mmrange(preproc$GarageArea)
normalizeData$MoSold = mmrange(preproc$MoSold)
normalizeData$SalePrice = mmrange(preproc$SalePrice)
normalizeData = subset(normalizeData,
                       select = -c(X2ndFlrSF, X1stFlrSF, TotalBsmtSF, DateSold))
normalizeData = normalizeData[order(normalizeData$SalePrice),]
head(normalizeData)

write.csv(preproc, './PreSelection.csv')
write.csv(normalizeData, './Preprocessed.csv')