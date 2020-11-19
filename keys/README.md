### Create the key and cert .pen files
use the following command inside this directory:

```sh
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout private.pen -out public.pen
```