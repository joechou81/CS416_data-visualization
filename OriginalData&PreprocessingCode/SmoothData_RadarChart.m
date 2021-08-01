
data = importdata('preprocessed.csv');
temp = data.data(:,[2,3,4,5,6,9]-1);

for i = 1:size(temp,2)
    temp(:,i) = smoothmulti(temp(:,i),40);
end

str = data.textdata(1,[2,3,4,6,9]);

plot(temp(:,[1,2,3,5,6]),temp(:,4));
legend(str)

YearRemodAdd = temp(:,1);
GrLivArea = temp(:,2);
TotRmsAbvGrd = temp(:,3);
GarageArea = temp(:,5);
TotalSF = temp(:,6);
SalePrice = temp(:,4);

T = table(YearRemodAdd,GrLivArea,TotRmsAbvGrd,GarageArea,TotalSF,SalePrice);

% writetable(T,'smooth.csv','Delimiter',',') 

mean(diff(temp(:,[1,2,3,5,6]) - temp(1,[1,2,3,5,6])))*10e4


function data = smoothmulti(data,num)
for i = 1:num
    data = smooth(data);
end
end

