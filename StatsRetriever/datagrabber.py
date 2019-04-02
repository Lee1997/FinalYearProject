import json

tune_types = {}
modes = {}
meters = {}

def increment(key, data):
	try:
		data[key] = str(int(data[key]) + 1)
	except:
		data[key] = 1;



with open('./json/tunes.json') as json_file:  
	data = json.load(json_file)
	for tune in data:
		increment(tune["type"], tune_types)
		increment(tune["mode"], modes)
		increment(tune["meter"], meters)
		


			


print(tune_types)
print()
print(modes)
print()
print(meters)

data = {"types": tune_types, "modes": modes, "meters": meters}


with open('../src/utilities/chart-data/data.json', 'w') as outfile:  
    json.dump(data, outfile)

