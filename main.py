#!/usr/bin/python
# -*- coding: UTF-8 -*-

# url格式：https:\/\/mozhua.aerfaying.com\/Projects\/\d+

from getter import Getter

getter = Getter(raw_input("Project address: "))
getter.get()
getter.write()
