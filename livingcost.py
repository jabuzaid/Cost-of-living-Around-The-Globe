import pandas as pd
from sqlalchemy import create_engine

data = pd.read_csv("cost_of_living_data_combine.csv")

engine = create_engine('sqlite:///data/costofliving', echo = False)

data.to_sql('COL', con=engine)

#engine.execute("SELECT * FROM COL")
# print(engine.execute("SELECT * FROM COL").fetchall())




engine = create_engine('sqlite:///data/costofliving', echo = False)

#CityCountry = engine.execute("SELECT City,Country FROM COL").fetchall()
#costoflivingindex = engine.execute("SELECT CostofLivingIndex FROM COL").fetchall()
#costdata = engine.execute("SELECT id,County,City FROM COL").fetchall()
#rowsdata = engine.execute("SELECT * FROM COL").fetchall()
#print(type(costdata))
#print(costoflivingindex)
