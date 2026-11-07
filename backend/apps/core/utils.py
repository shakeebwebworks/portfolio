def lines(text):
    return [l.strip() for l in (text or "").splitlines() if l.strip()]
