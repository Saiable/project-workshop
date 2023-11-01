import json

def read_config(name, config_file_path="config.json"):
    with open(config_file_path, 'r') as config_file:
        config = json.load(config_file)
        return config[name]