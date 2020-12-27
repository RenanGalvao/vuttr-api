### Create the key and cert .pen files
use the following command inside this directory:

```sh
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout access_private.pen -out access_public.pen && openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout refresh_private.pen -out refresh_public.pen
```