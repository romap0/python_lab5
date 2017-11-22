import random
import requests
import lxml.html


def get_famous_names():
    import lxml.html

    html = lxml.html.parse('famous-100.html')

    rows = html.xpath('//article/section/ol[1]/li/a')
    names = []

    for (i, row) in enumerate(rows):
        names.append(row.text_content())

    return names


def get_images(name):
    url = 'https://www.google.ru/search?tbm=isch&gbv=1&newwindow=1&q=' + \
        name.replace(' ', '+') + '+face'

    response = requests.get(url).text

    html = lxml.html.fromstring(response)
    raw_images = html.xpath('//a/img')

    images = []
    for (i, image) in enumerate(raw_images):
        images.append(image.attrib['src'])

    return images


def get_image(name):
    images = get_images(name)
    return images[random.randint(0, len(images) - 1)]
