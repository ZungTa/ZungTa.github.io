---
title: Fluuter Get Widget Size
date: 2021-02-17 15:09:83
category: flutter
thumbnail: { https://cdn.pixabay.com/photo/2021/08/26/18/18/flower-6576831_960_720.jpg }
draft: false
---

```dart
double originHeight;

@override
void initState() {
  // TODO: implement initState
  super.initState();
  WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
    setState(() {
      originHeight = context.size.height;
    });
  });
}
```