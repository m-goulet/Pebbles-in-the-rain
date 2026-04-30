#encrypts files using AES-256

from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.scrypt import Scrypt
import os, sys

#returns the key derived from password in byte format
def derive_key(password: bytes, salt: bytes):
    kdf = Scrypt(salt=salt, length=32, n=2**14, r=8, p=1)
    return kdf.derive(password)


def encrypt(path, password):
    salt = os.urandom(16)
    nonce = os.urandom(12)
    key = derive_key(password.encode(), salt)
#    print(key.hex())
    data = open(path, "rb").read()
    ct = AESGCM(key).encrypt(nonce, data, None)
    with open(path + ".enc", "wb") as f:
        f.write(salt + nonce + ct)
    print(f"Encrypted → {path}.enc")
#    print(salt.hex())
#    print(nonce.hex())


def decrypt(path, password):
    raw = open(path, "rb").read()
    salt, nonce, ct = raw[:16], raw[16:28], raw[28:]
    key = derive_key(password.encode(), salt)
    data = AESGCM(key).decrypt(nonce, ct, None)
    out = path.removesuffix(".enc")
    open(out, "wb").write(data)
    print(f"Decrypted → {out}")

if len(sys.argv)==4:
    cmd, path, pw = sys.argv[1], sys.argv[2], sys.argv[3]
    if cmd == "enc":
        encrypt(path, pw) 
    else:
        decrypt(path, pw)
else:
    print("Usage: python encr.py {command: (enc or dec)} {filepath} {password}")