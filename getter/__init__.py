#!/usr/bin/python
# -*- coding: UTF-8 -*-

import urllib2, json as JSON
import zipfile
import shutil
import sys
import os
import ssl
ssl.match_hostname = lambda cert, hostname: True

starterLen = len("https://mozhua.aerfaying.com/Projects/")


class Getter(object):
    def __init__(self, url):
        print("Creating getter object...")
        print("Parsing url...")
        # url format:  https://mozhua.aerfaying.com/Projects/329638
        self.url = url
        self.pid = ""
        for i in range(starterLen, len(url)):
            self.pid += url[i]
        self.pid = str(int(self.pid))
        self.resurl = "https://asset.mozhua.org:444/Project/download?id=" + self.pid + "&v=1"
        self.content = ""
        self.json = {}
        self.medias = []
        pass

    def get(self):
        print("Getting source json script...")
        # "https://asset.mozhua.org:444/Project/download?id=329638&v=1"
        self.content = self.__send(self.resurl)
        self.json = JSON.loads(self.content)
        self.load()
        pass

    def write(self):
        path = "scratch.sb3.temp.grabalpha"
        print("Writing scratch file...")
        print("Making script dir...")
        mkdir(path)
        print("Writing script file...")
        f = open(path + "/project.json", "w")
        f.write(self.content)
        f.close()
        for media in self.medias:
            print("Writing media file '" + media["filename"] + "'...")
            f = open(path + "/" + media["filename"], "w")
            f.write(media["content"])
            f.close()
        print("Compressing file...")
        zipDir(path, "scrath-grab-alpha.sb3")
        print("Removing temp dir...")
        shutil.rmtree(path)

    def load(self):
        print("Parsing source json script...")
        print("Downloading media files...")
        print("Downloading media files of '" + self.json["objName"] + "'...")
        sounds = self.json["sounds"]
        costumes = self.json["costumes"]
        for i in sounds:
            filename = i["md5"]
            print("Downloading sound file '" + i["soundName"] + "'...")
            url = "https://cdn.mozhua.org/Media?name=" + filename
            content = self.__send(url)
            self.medias.append({
                "filename": filename,
                "content":  content
            })
        for i in costumes:
            filename = i["baseLayerMD5"]
            print("Downloading costumes file '" + i["costumeName"] + "'...")
            url = "https://cdn.mozhua.org/Media?name=" + filename
            content = self.__send(url)
            self.medias.append({
                "filename": filename,
                "content":  content
            })
        filename = self.json["penLayerMD5"]
        print("Downloading pen layer file...")
        url = "https://cdn.mozhua.org/Media?name=" + filename
        content = self.__send(url)
        self.medias.append({
            "filename": filename,
            "content": content
        })
        print("Parsing sprites...")
        children = self.json["children"]
        for sprite in children:
            print("Parsing sprite '" + sprite["objName"] + "'...")
            sounds = sprite["sounds"]
            costumes = sprite["costumes"]
            for i in sounds:
                filename = i["md5"]
                print("Downloading sound file '" + i["soundName"] + "'...")
                url = "https://cdn.mozhua.org/Media?name=" + filename
                content = self.__send(url)
                self.medias.append({
                    "filename": filename,
                    "content": content
                })
            for i in costumes:
                filename = i["baseLayerMD5"]
                print("Downloading costumes file '" + i["costumeName"] + "'...")
                url = "https://cdn.mozhua.org/Media?name=" + filename
                content = self.__send(url)
                self.medias.append({
                    "filename": filename,
                    "content": content
                })
        print("Finish parsing.")

    @staticmethod
    def __send(url):
        print("Sending request '" + url + "'")
        response = urllib2.urlopen(url)
        return response.read()


def mkdir(path):
    import os

    path = path.strip()
    path = path.rstrip("\\")

    is_exists = os.path.exists(path)

    # 判断结果
    if not is_exists:
        os.makedirs(path)
        return True
    else:
        return False


def zipDir(dirpath, outFullName):
    zip = zipfile.ZipFile(outFullName, "w", zipfile.ZIP_DEFLATED)
    for path, dirnames, filenames in os.walk(dirpath):
        # 去掉目标跟路径，只对目标文件夹下边的文件及文件夹进行压缩
        fpath = path.replace(dirpath, '')

        for filename in filenames:
            zip.write(os.path.join(path, filename), os.path.join(fpath, filename))
    zip.close()
